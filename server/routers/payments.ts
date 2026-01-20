import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { createCheckoutSession, createCustomerPortalSession, stripe } from "../_core/stripe";
import { getDb } from "../db";
import { 
  subscriptions, 
  stripeCustomers, 
  paymentTransactions,
  egyptianPaymentReferences 
} from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const paymentsRouter = router({
  // Create Stripe checkout session
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        planCategory: z.string(),
        planName: z.string(),
        billingPeriod: z.enum(["monthly", "annual"]),
        priceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      // Check if user already has an active subscription
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const existingSubscription = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, user.id),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (existingSubscription.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You already have an active subscription. Please cancel it first or upgrade from the customer portal.",
        });
      }

      // Get or create Stripe customer
      let stripeCustomer = await db
        .select()
        .from(stripeCustomers)
        .where(eq(stripeCustomers.userId, user.id))
        .limit(1);

      let customerId: string;

      if (stripeCustomer.length === 0) {
        // Create new Stripe customer
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id.toString(),
          },
        });

        // Save to database
        await db.insert(stripeCustomers).values({
          userId: user.id,
          stripeCustomerId: customer.id,
          email: user.email || "",
          name: user.name || undefined,
        });

        customerId = customer.id;
      } else {
        customerId = stripeCustomer[0].stripeCustomerId;
      }

      // Create checkout session
      const baseUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000";
      const session = await createCheckoutSession({
        priceId: input.priceId,
        customerEmail: user.email || undefined,
        successUrl: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/pricing`,
        metadata: {
          userId: user.id.toString(),
          planCategory: input.planCategory,
          planName: input.planName,
          billingPeriod: input.billingPeriod,
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),

  // Create customer portal session
  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.user;

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    // Get Stripe customer
    const stripeCustomer = await db
      .select()
      .from(stripeCustomers)
      .where(eq(stripeCustomers.userId, user.id))
      .limit(1);

    if (stripeCustomer.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Stripe customer found. Please subscribe to a plan first.",
      });
    }

    const baseUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000";
    const session = await createCustomerPortalSession({
      customerId: stripeCustomer[0].stripeCustomerId,
      returnUrl: `${baseUrl}/account/subscriptions`,
    });

    return {
      url: session.url,
    };
  }),

  // Get user's subscriptions
  getSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const userSubscriptions = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .orderBy(subscriptions.createdAt);

    return userSubscriptions;
  }),

  // Get user's payment transactions
  getTransactions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const transactions = await db
      .select()
      .from(paymentTransactions)
      .where(eq(paymentTransactions.userId, user.id))
      .orderBy(paymentTransactions.createdAt);

    return transactions;
  }),

  // Generate Egyptian payment reference
  generateEgyptianPaymentReference: protectedProcedure
    .input(
      z.object({
        paymentMethod: z.enum(["fawry", "instapay", "vodafone_cash", "orange_money", "bank_transfer"]),
        planCategory: z.string(),
        planName: z.string(),
        amount: z.number(), // Amount in EGP cents
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Generate unique reference number
      const referenceNumber = `APX${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      // Set expiry to 7 days from now
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // Generate payment instructions based on method
      let instructions = "";
      switch (input.paymentMethod) {
        case "fawry":
          instructions = `Please visit any Fawry outlet and provide this reference number: ${referenceNumber}. Payment will be verified within 24 hours.`;
          break;
        case "instapay":
          instructions = `Transfer to: Apex Meridian LLC\nAccount: 1234567890\nBank: Commercial International Bank (CIB)\nReference: ${referenceNumber}\nAmount: EGP ${(input.amount / 100).toFixed(2)}`;
          break;
        case "vodafone_cash":
          instructions = `Send payment to: 01200929092\nReference: ${referenceNumber}\nAmount: EGP ${(input.amount / 100).toFixed(2)}`;
          break;
        case "orange_money":
          instructions = `Send payment to: 01200929092\nReference: ${referenceNumber}\nAmount: EGP ${(input.amount / 100).toFixed(2)}`;
          break;
        case "bank_transfer":
          instructions = `Bank: Commercial International Bank (CIB)\nAccount Name: Apex Meridian LLC\nAccount Number: 1234567890\nIBAN: EG380001001234567890123456789\nReference: ${referenceNumber}\nAmount: EGP ${(input.amount / 100).toFixed(2)}`;
          break;
      }

      // Save reference to database
      await db.insert(egyptianPaymentReferences).values({
        userId: user.id,
        referenceNumber,
        paymentMethod: input.paymentMethod,
        amount: input.amount,
        planCategory: input.planCategory,
        planName: input.planName,
        status: "pending",
        expiresAt,
        instructions,
      });

      // Create pending transaction
      await db.insert(paymentTransactions).values({
        userId: user.id,
        paymentMethod: input.paymentMethod,
        amount: input.amount,
        currency: "EGP",
        status: "pending",
        referenceNumber,
      });

      return {
        referenceNumber,
        instructions,
        expiresAt,
      };
    }),

  // Get Egyptian payment reference
  getEgyptianPaymentReference: protectedProcedure
    .input(z.object({ referenceNumber: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const reference = await db
        .select()
        .from(egyptianPaymentReferences)
        .where(
          and(
            eq(egyptianPaymentReferences.userId, user.id),
            eq(egyptianPaymentReferences.referenceNumber, input.referenceNumber)
          )
        )
        .limit(1);

      if (reference.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Payment reference not found",
        });
      }

      return reference[0];
    }),
});
