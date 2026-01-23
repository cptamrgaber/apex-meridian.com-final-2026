import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { conversations, conversationParticipants, messages, socialProfiles } from "../../drizzle/schema";
import { eq, and, or, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const messagingRouter = router({
  // Get all conversations for current user
  getConversations: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    // Get all conversations where user is a participant
    const userConversations = await db
      .select({
        conversationId: conversationParticipants.conversationId,
        conversation: conversations,
        // lastMessage: messages, // Removed - lastMessageId doesn't exist in schema
      })
      .from(conversationParticipants)
      .innerJoin(
        conversations,
        eq(conversationParticipants.conversationId, conversations.id)
      )
      .where(eq(conversationParticipants.userId, userId))
      .orderBy(desc(conversations.updatedAt));

    // Get other participants for each conversation
    const conversationsWithParticipants = await Promise.all(
      userConversations.map(async (conv: any) => {
        const participants = await db
          .select({
            userId: conversationParticipants.userId,
            profile: socialProfiles,
          })
          .from(conversationParticipants)
          .innerJoin(
            socialProfiles,
            eq(conversationParticipants.userId, socialProfiles.userId)
          )
          .where(
            and(
              eq(conversationParticipants.conversationId, conv.conversationId),
              sql`${conversationParticipants.userId} != ${userId}`
            )
          );

        return {
          ...conv.conversation,
          participants: participants.map((p: any) => p.profile),
        };
      })
    );

    return conversationsWithParticipants;
  }),

  // Get or create conversation with another user
  getOrCreateConversation: protectedProcedure
    .input(
      z.object({
        otherUserId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      if (userId === input.otherUserId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot create conversation with yourself",
        });
      }

      // Check if conversation already exists
      const existingConversation = await db
        .select({
          conversationId: conversationParticipants.conversationId,
        })
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, userId))
        .then(async (userConvs: any) => {
          for (const conv of userConvs) {
            const participants = await db
              .select()
              .from(conversationParticipants)
              .where(eq(conversationParticipants.conversationId, conv.conversationId));

            if (
              participants.length === 2 &&
              participants.some((p: any) => p.userId === input.otherUserId)
            ) {
              return conv.conversationId;
            }
          }
          return null;
        });

      if (existingConversation) {
        return { conversationId: existingConversation };
      }

      // Create new conversation
      const [newConversation] = await db
        .insert(conversations)
        .values({
          type: "direct",
          createdBy: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .$returningId();

      // Add participants
      await db.insert(conversationParticipants).values([
        {
          conversationId: newConversation.id,
          userId,
          joinedAt: new Date(),
        },
        {
          conversationId: newConversation.id,
          userId: input.otherUserId,
          joinedAt: new Date(),
        },
      ]);

      return { conversationId: newConversation.id };
    }),

  // Get messages for a conversation
  getMessages: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify user is participant
      const participant = await db
        .select()
        .from(conversationParticipants)
        .where(
          and(
            eq(conversationParticipants.conversationId, input.conversationId),
            eq(conversationParticipants.userId, userId)
          )
        )
        .limit(1);

      if (participant.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a participant in this conversation",
        });
      }

      // Get messages with sender profiles
      const conversationMessages = await db
        .select({
          message: messages,
          sender: socialProfiles,
        })
        .from(messages)
        .innerJoin(socialProfiles, eq(messages.senderId, socialProfiles.userId))
        .where(eq(messages.conversationId, input.conversationId))
        .orderBy(desc(messages.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return conversationMessages.map((m: any) => ({
        ...m.message,
        sender: m.sender,
      }));
    }),

  // Send a message
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        content: z.string().min(1).max(5000),
        messageType: z.enum(["text", "image", "video", "audio", "file"]).default("text"),
        mediaUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify user is participant
      const participant = await db
        .select()
        .from(conversationParticipants)
        .where(
          and(
            eq(conversationParticipants.conversationId, input.conversationId),
            eq(conversationParticipants.userId, userId)
          )
        )
        .limit(1);

      if (participant.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a participant in this conversation",
        });
      }

      // Create message
      const [newMessage] = await db
        .insert(messages)
        .values({
          conversationId: input.conversationId,
          senderId: userId,
          content: input.content,
          messageType: input.messageType,
          mediaUrls: input.mediaUrl ? JSON.stringify([input.mediaUrl]) : null,
          createdAt: new Date(),
        })
        .$returningId();

      // Update conversation's last message timestamp
      await db
        .update(conversations)
        .set({
          lastMessageAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(conversations.id, input.conversationId));

      return { messageId: newMessage.id };
    }),

  // Mark messages as read
  markAsRead: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Update all unread messages in conversation
      await db
        .update(messages)
        .set({
          isRead: 1,
          readAt: new Date(),
        })
        .where(
          and(
            eq(messages.conversationId, input.conversationId),
            sql`${messages.senderId} != ${userId}`,
            eq(messages.isRead, 0)
          )
        );

      return { success: true };
    }),

  // Get unread message count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    // Get all conversations where user is a participant
    const userConversations = await db
      .select({ conversationId: conversationParticipants.conversationId })
      .from(conversationParticipants)
      .where(eq(conversationParticipants.userId, userId));

    const conversationIds = userConversations.map((c: any) => c.conversationId);

    if (conversationIds.length === 0) {
      return { unreadCount: 0 };
    }

    // Count unread messages
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(
        and(
          sql`${messages.conversationId} IN (${sql.join(conversationIds, sql`, `)})`,
          sql`${messages.senderId} != ${userId}`,
          eq(messages.isRead, 0)
        )
      );

    return { unreadCount: Number(result[0]?.count || 0) };
  }),
});
