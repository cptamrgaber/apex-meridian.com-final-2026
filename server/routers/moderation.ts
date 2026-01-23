import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { aiModerationQueue, posts, comments, users } from "../../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "../_core/llm";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const moderationRouter = router({
  // Moderate content using AI
  moderateContent: protectedProcedure
    .input(
      z.object({
        contentType: z.enum(["post", "comment", "message", "profile"]),
        contentId: z.number(),
        content: z.string(),
        language: z.enum(["en", "ar"]).default("en"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      try {
        // Use LLM to analyze content
        const systemPrompt = `You are a content moderation AI for a social media platform. Analyze the following ${input.language === "ar" ? "Arabic" : "English"} content and determine if it violates community guidelines.

Check for:
1. Hate speech or discrimination
2. Harassment or bullying
3. Spam or misleading content
4. Explicit sexual content
5. Violence or graphic content
6. Illegal activities

Respond with a JSON object containing:
{
  "isViolation": boolean,
  "violationType": "hate_speech" | "harassment" | "spam" | "sexual_content" | "violence" | "illegal" | "none",
  "confidence": number (0-1),
  "reason": "brief explanation in English"
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: String(input.content) },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "moderation_result",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  isViolation: { type: "boolean" },
                  violationType: {
                    type: "string",
                    enum: ["hate_speech", "harassment", "spam", "sexual_content", "violence", "illegal", "none"],
                  },
                  confidence: { type: "number" },
                  reason: { type: "string" },
                },
                required: ["isViolation", "violationType", "confidence", "reason"],
                additionalProperties: false,
              },
            },
          },
        });

        const messageContent = response.choices[0].message.content;
        const contentString = typeof messageContent === 'string' ? messageContent : JSON.stringify(messageContent);
        const result = JSON.parse(contentString || "{}");

        // If violation detected with high confidence, add to moderation queue
        if (result.isViolation && result.confidence > 0.7) {
          await db.insert(aiModerationQueue).values({
            contentType: input.contentType,
            contentId: input.contentId,
            reportedBy: ctx.user.id,
            reason: result.reason,
            status: "pending",
            aiConfidence: result.confidence,
            violationType: result.violationType,
            createdAt: new Date(),
          });

          return {
            flagged: true,
            reason: result.reason,
            violationType: result.violationType,
            confidence: result.confidence,
          };
        }

        return {
          flagged: false,
          reason: "Content passed moderation",
          confidence: result.confidence,
        };
      } catch (error) {
        console.error("Moderation error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to moderate content",
        });
      }
    }),

  // Get moderation queue (admin only)
  getModerationQueue: adminProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected", "all"]).default("pending"),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const whereCondition =
        input.status === "all" ? undefined : eq(aiModerationQueue.status, input.status);

      const queueItems = await db
        .select({
          queue: aiModerationQueue,
          reporter: users,
        })
        .from(aiModerationQueue)
        .leftJoin(users, eq(aiModerationQueue.reportedBy, users.id))
        .where(whereCondition)
        .orderBy(desc(aiModerationQueue.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Fetch actual content for each item
      const itemsWithContent = await Promise.all(
        queueItems.map(async (item) => {
          let content = null;

          if (item.queue.contentType === "post") {
            const [post] = await db
              .select()
              .from(posts)
              .where(eq(posts.id, item.queue.contentId))
              .limit(1);
            content = post;
          } else if (item.queue.contentType === "comment") {
            const [comment] = await db
              .select()
              .from(comments)
              .where(eq(comments.id, item.queue.contentId))
              .limit(1);
            content = comment;
          }

          return {
            ...item.queue,
            reporter: item.reporter,
            content,
          };
        })
      );

      return itemsWithContent;
    }),

  // Approve content (admin only)
  approveContent: adminProcedure
    .input(
      z.object({
        queueId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db
        .update(aiModerationQueue)
        .set({
          status: "approved",
          reviewedAt: new Date(),
        })
        .where(eq(aiModerationQueue.id, input.queueId));

      return { success: true };
    }),

  // Reject content (admin only)
  rejectContent: adminProcedure
    .input(
      z.object({
        queueId: z.number(),
        deleteContent: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get queue item to know what content to delete
      const [queueItem] = await db
        .select()
        .from(aiModerationQueue)
        .where(eq(aiModerationQueue.id, input.queueId))
        .limit(1);

      if (!queueItem) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Queue item not found" });
      }

      // Update queue status
      await db
        .update(aiModerationQueue)
        .set({
          status: "rejected",
          reviewedAt: new Date(),
        })
        .where(eq(aiModerationQueue.id, input.queueId));

      // Delete content if requested
      if (input.deleteContent) {
        if (queueItem.contentType === "post") {
          // Mark post as hidden/removed (posts table doesn't have isDeleted field)
          // In production, you might want to add this field or use a different approach
        } else if (queueItem.contentType === "comment") {
          await db
            .update(comments)
            .set({ aiModerationStatus: "removed" })
            .where(eq(comments.id, queueItem.contentId));
        }
      }

      return { success: true };
    }),

  // Get moderation statistics (admin only)
  getModerationStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const [pendingCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(aiModerationQueue)
      .where(eq(aiModerationQueue.status, "pending"));

    const [approvedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(aiModerationQueue)
      .where(eq(aiModerationQueue.status, "approved"));

    const [rejectedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(aiModerationQueue)
      .where(eq(aiModerationQueue.status, "rejected"));

    const violationTypes = await db
      .select({
        violationType: aiModerationQueue.violationType,
        count: sql<number>`count(*)`,
      })
      .from(aiModerationQueue)
      .where(eq(aiModerationQueue.status, "pending"))
      .groupBy(aiModerationQueue.violationType);

    return {
      pending: Number(pendingCount?.count || 0),
      approved: Number(approvedCount?.count || 0),
      rejected: Number(rejectedCount?.count || 0),
      violationTypes: violationTypes.map((v) => ({
        type: v.violationType,
        count: Number(v.count),
      })),
    };
  }),
});
