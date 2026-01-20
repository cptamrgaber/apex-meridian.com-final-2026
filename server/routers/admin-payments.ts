import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { 
  egyptianPaymentReferences,
  paymentTransactions,
  subscriptions
} from "../../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// Middleware to check admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin access required',
    });
  }
  return next({ ctx });
});

export const adminPaymentsRouter = router({
  // Get pending Egyptian payment references
  getPendingPayments: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database not available',
      });
    }

    const pending = await db
      .select()
      .from(egyptianPaymentReferences)
      .where(eq(egyptianPaymentReferences.status, 'pending'))
      .orderBy(desc(egyptianPaymentReferences.createdAt));

    return pending;
  }),

  // Verify Egyptian payment
  verifyPayment: adminProcedure
    .input(
      z.object({
        referenceId: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not available',
        });
      }

      // Get payment reference
      const references = await db
        .select()
        .from(egyptianPaymentReferences)
        .where(eq(egyptianPaymentReferences.id, input.referenceId))
        .limit(1);

      if (references.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment reference not found',
        });
      }

      const reference = references[0];

      // Update reference status
      await db
        .update(egyptianPaymentReferences)
        .set({
          status: 'verified',
          verifiedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(egyptianPaymentReferences.id, input.referenceId));

      // Update transaction status
      await db
        .update(paymentTransactions)
        .set({
          status: 'completed',
          updatedAt: new Date(),
        })
        .where(eq(paymentTransactions.referenceNumber, reference.referenceNumber));

      // Create subscription
      const currentPeriodStart = new Date();
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1); // 1 month subscription

      await db.insert(subscriptions).values({
        userId: reference.userId,
        planCategory: reference.planCategory,
        planName: reference.planName,
        billingPeriod: 'monthly',
        amount: reference.amount,
        currency: 'EGP',
        status: 'active',
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: 0,
      });

      return { success: true };
    }),

  // Reject Egyptian payment
  rejectPayment: adminProcedure
    .input(
      z.object({
        referenceId: z.number(),
        reason: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not available',
        });
      }

      // Get payment reference
      const references = await db
        .select()
        .from(egyptianPaymentReferences)
        .where(eq(egyptianPaymentReferences.id, input.referenceId))
        .limit(1);

      if (references.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment reference not found',
        });
      }

      const reference = references[0];

      // Update reference status
      await db
        .update(egyptianPaymentReferences)
        .set({
          status: 'expired',
          updatedAt: new Date(),
        })
        .where(eq(egyptianPaymentReferences.id, input.referenceId));

      // Update transaction status
      await db
        .update(paymentTransactions)
        .set({
          status: 'failed',
          metadata: JSON.stringify({ rejectionReason: input.reason }),
          updatedAt: new Date(),
        })
        .where(eq(paymentTransactions.referenceNumber, reference.referenceNumber));

      return { success: true };
    }),

  // Get payment analytics
  getAnalytics: adminProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not available',
        });
      }

      // Get all completed transactions
      const transactions = await db
        .select()
        .from(paymentTransactions)
        .where(eq(paymentTransactions.status, 'completed'))
        .orderBy(desc(paymentTransactions.createdAt));

      // Get all active subscriptions
      const activeSubscriptions = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.status, 'active'));

      // Calculate MRR (Monthly Recurring Revenue)
      const mrr = activeSubscriptions.reduce((sum, sub) => {
        const monthlyAmount = sub.billingPeriod === 'annual' 
          ? sub.amount / 12 
          : sub.amount;
        return sum + monthlyAmount;
      }, 0);

      // Calculate total revenue
      const totalRevenue = transactions.reduce((sum, trans) => sum + trans.amount, 0);

      // Payment method breakdown
      const paymentMethodBreakdown = transactions.reduce((acc, trans) => {
        const method = trans.paymentMethod;
        if (!acc[method]) {
          acc[method] = { count: 0, amount: 0 };
        }
        acc[method].count++;
        acc[method].amount += trans.amount;
        return acc;
      }, {} as Record<string, { count: number; amount: number }>);

      // Revenue by month (last 12 months)
      const revenueByMonth = transactions.reduce((acc, trans) => {
        const month = new Date(trans.createdAt).toISOString().slice(0, 7); // YYYY-MM
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += trans.amount;
        return acc;
      }, {} as Record<string, number>);

      return {
        mrr: mrr / 100, // Convert from cents to EGP
        totalRevenue: totalRevenue / 100,
        activeSubscriptions: activeSubscriptions.length,
        totalTransactions: transactions.length,
        paymentMethodBreakdown,
        revenueByMonth,
      };
    }),

  // Get all transactions for admin view
  getAllTransactions: adminProcedure
    .input(
      z.object({
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not available',
        });
      }

      const transactions = await db
        .select()
        .from(paymentTransactions)
        .orderBy(desc(paymentTransactions.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return transactions;
    }),
});
