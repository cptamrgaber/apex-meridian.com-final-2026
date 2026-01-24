import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { stories, storyViews, users, socialProfiles } from "../../drizzle/schema";
import { eq, and, desc, sql, gt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { storagePut } from "../storage";

export const storiesRouter = router({
  // Create a new story
  createStory: protectedProcedure
    .input(
      z.object({
        mediaUrl: z.string().url(),
        mediaType: z.enum(["image", "video"]),
        duration: z.number().min(1).max(30).default(5), // seconds
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

      const [story] = await db.insert(stories).values({
        userId: ctx.user.id,
        mediaUrl: input.mediaUrl,
        mediaType: input.mediaType,
        duration: input.duration,
        expiresAt,
        createdAt: new Date(),
      });

      return { success: true, storyId: story.insertId };
    }),

  // Upload story media to S3
  uploadStoryMedia: protectedProcedure
    .input(
      z.object({
        fileData: z.string(), // base64 encoded file
        fileName: z.string(),
        mimeType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Convert base64 to buffer
        const base64Data = input.fileData.replace(/^data:.*?;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Generate unique file key
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(7);
        const fileExtension = input.fileName.split(".").pop();
        const fileKey = `stories/${ctx.user.id}/${timestamp}-${randomSuffix}.${fileExtension}`;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        return { url };
      } catch (error) {
        console.error("Story media upload error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload story media",
        });
      }
    }),

  // Get all active stories (not expired) grouped by user
  getStories: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const now = new Date();

    // Get all active stories with user info
    const activeStories = await db
      .select({
        story: stories,
        user: users,
        profile: socialProfiles,
      })
      .from(stories)
      .leftJoin(users, eq(stories.userId, users.id))
      .leftJoin(socialProfiles, eq(stories.userId, socialProfiles.userId))
      .where(gt(stories.expiresAt, now))
      .orderBy(desc(stories.createdAt));

    // Group stories by user
    const groupedStories = activeStories.reduce((acc: any, item) => {
      const userId = item.story.userId;
      if (!acc[userId]) {
        acc[userId] = {
          user: item.user,
          profile: item.profile,
          stories: [],
        };
      }
      acc[userId].stories.push(item.story);
      return acc;
    }, {});

    return Object.values(groupedStories);
  }),

  // Get my stories
  getMyStories: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const now = new Date();

    const myStories = await db
      .select()
      .from(stories)
      .where(and(eq(stories.userId, ctx.user.id), gt(stories.expiresAt, now)))
      .orderBy(desc(stories.createdAt));

    return myStories;
  }),

  // Get user's stories
  getUserStories: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const now = new Date();

      const userStories = await db
        .select()
        .from(stories)
        .where(and(eq(stories.userId, input.userId), gt(stories.expiresAt, now)))
        .orderBy(desc(stories.createdAt));

      return userStories;
    }),

  // View a story (track view)
  viewStory: protectedProcedure
    .input(
      z.object({
        storyId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Check if already viewed
      const [existingView] = await db
        .select()
        .from(storyViews)
        .where(and(eq(storyViews.storyId, input.storyId), eq(storyViews.viewerId, ctx.user.id)))
        .limit(1);

      if (!existingView) {
        // Add view
        await db.insert(storyViews).values({
          storyId: input.storyId,
          viewerId: ctx.user.id,
          viewedAt: new Date(),
        });

        // Increment views count
        await db
          .update(stories)
          .set({
            viewCount: sql`${stories.viewCount} + 1`,
          })
          .where(eq(stories.id, input.storyId));
      }

      return { success: true };
    }),

  // Get story viewers
  getStoryViewers: protectedProcedure
    .input(
      z.object({
        storyId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify story belongs to current user
      const [story] = await db
        .select()
        .from(stories)
        .where(eq(stories.id, input.storyId))
        .limit(1);

      if (!story || story.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized to view story viewers" });
      }

      const viewers = await db
        .select({
          view: storyViews,
          user: users,
          profile: socialProfiles,
        })
        .from(storyViews)
        .leftJoin(users, eq(storyViews.viewerId, users.id))
        .leftJoin(socialProfiles, eq(storyViews.viewerId, socialProfiles.userId))
        .where(eq(storyViews.storyId, input.storyId))
        .orderBy(desc(storyViews.viewedAt));

      return viewers.map((v) => ({
        user: v.user,
        profile: v.profile,
        viewedAt: v.view.viewedAt,
      }));
    }),

  // Delete a story
  deleteStory: protectedProcedure
    .input(
      z.object({
        storyId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify story belongs to current user
      const [story] = await db
        .select()
        .from(stories)
        .where(eq(stories.id, input.storyId))
        .limit(1);

      if (!story || story.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized to delete this story" });
      }

      // Delete story views first
      await db.delete(storyViews).where(eq(storyViews.storyId, input.storyId));

      // Delete story
      await db.delete(stories).where(eq(stories.id, input.storyId));

      return { success: true };
    }),

  // Get story statistics
  getStoryStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const now = new Date();

    const [activeCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(stories)
      .where(and(eq(stories.userId, ctx.user.id), gt(stories.expiresAt, now)));

    const [totalViews] = await db
      .select({ total: sql<number>`sum(${stories.viewCount})` })
      .from(stories)
      .where(eq(stories.userId, ctx.user.id));

    return {
      activeStories: Number(activeCount?.count || 0),
      totalViews: Number(totalViews?.total || 0),
    };
  }),
});
