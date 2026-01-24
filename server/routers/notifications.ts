import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { eq, and, desc, sql } from "drizzle-orm";
import { notifications, users, socialProfiles } from "../../drizzle/schema";
import { TRPCError } from "@trpc/server";

export const notificationsRouter = router({
  /**
   * Get user's notifications
   */
  getNotifications: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
        unreadOnly: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Build query conditions
      const conditions = [eq(notifications.userId, ctx.user.id)];
      if (input.unreadOnly) {
        conditions.push(eq(notifications.isRead, 0));
      }

      // Get notifications
      const notificationsList = await db
        .select()
        .from(notifications)
        .where(and(...conditions))
        .orderBy(desc(notifications.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get sender profiles for each notification
      const actorIds = Array.from(new Set(notificationsList.map((n) => n.actorId).filter(Boolean))) as number[];
      
      if (actorIds.length === 0) {
        return notificationsList.map((n) => ({ ...n, actor: null }));
      }

      const actorProfiles = await db
        .select()
        .from(socialProfiles)
        .where(sql`${socialProfiles.userId} IN (${sql.join(actorIds.map(id => sql`${id}`), sql`, `)})`);

      const actorMap = new Map(actorProfiles.map((p) => [p.userId, p]));

      return notificationsList.map((n) => ({
        ...n,
        actor: n.actorId ? actorMap.get(n.actorId) : null,
      }));
    }),

  /**
   * Get unread notifications count
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const result = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(notifications)
      .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, 0)));

    return { unreadCount: Number(result[0]?.count || 0) };
  }),

  /**
   * Mark notification as read
   */
  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify ownership
      const notificationResults = await db
        .select()
        .from(notifications)
        .where(eq(notifications.id, input.notificationId))
        .limit(1);
      
      const notification = notificationResults[0];

      if (!notification || notification.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
      }

      await db
        .update(notifications)
        .set({ isRead: 1 })
        .where(eq(notifications.id, input.notificationId));

      return { success: true };
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    await db
      .update(notifications)
      .set({ isRead: 1 })
      .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, 0)));

    return { success: true };
  }),

  /**
   * Delete notification
   */
  deleteNotification: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify ownership
      const notificationResults = await db
        .select()
        .from(notifications)
        .where(eq(notifications.id, input.notificationId))
        .limit(1);
      
      const notification = notificationResults[0];

      if (!notification || notification.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });
      }

      await db.delete(notifications).where(eq(notifications.id, input.notificationId));

      return { success: true };
    }),

  /**
   * Create notification (internal helper)
   */
  createNotification: protectedProcedure
    .input(
      z.object({
        recipientId: z.number(),
        type: z.enum(["like", "comment", "follow", "mention", "share", "message", "group_invite"]),
        entityType: z.enum(["post", "comment", "video", "story", "group"]),
        entityId: z.number(),
        content: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Don't create notification if sender is recipient
      if (ctx.user.id === input.recipientId) {
        return { success: true, notificationId: null };
      }

      const [notification] = await db.insert(notifications).values({
        userId: input.recipientId,
        actorId: ctx.user.id,
        type: input.type,
        entityType: input.entityType,
        entityId: input.entityId,
        content: input.content,
        isRead: 0,
      });

      return { success: true, notificationId: notification.insertId };
    }),
});
