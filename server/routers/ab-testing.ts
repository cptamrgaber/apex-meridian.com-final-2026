import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  createABTest,
  startABTest,
  stopABTest,
  getAllABTests,
  getABTestResults,
  recordImpression,
  recordConversion,
  getVariantForUser
} from "../lib/abTesting";

export const abTestingRouter = router({
  // Get all A/B tests (admin only)
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      return await getAllABTests();
    }),

  // Create new A/B test (admin only)
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      page: z.string(),
      element: z.string(),
      variantA: z.string(),
      variantB: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      const testId = await createABTest(input);
      return { testId };
    }),

  // Start A/B test (admin only)
  start: protectedProcedure
    .input(z.object({
      testId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      await startABTest(input.testId);
      return { success: true };
    }),

  // Stop A/B test (admin only)
  stop: protectedProcedure
    .input(z.object({
      testId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      await stopABTest(input.testId);
      return { success: true };
    }),

  // Get A/B test results (admin only)
  getResults: protectedProcedure
    .input(z.object({
      testId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      return await getABTestResults(input.testId);
    }),

  // Get variant for user (public)
  getVariant: publicProcedure
    .input(z.object({
      testId: z.number(),
      userId: z.string()
    }))
    .query(async ({ input }) => {
      const variant = await getVariantForUser(input.testId, input.userId);
      return { variant };
    }),

  // Record impression (public)
  recordImpression: publicProcedure
    .input(z.object({
      testId: z.number(),
      variant: z.enum(['A', 'B']),
      userId: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      await recordImpression(input.testId, input.variant, input.userId);
      return { success: true };
    }),

  // Record conversion (public)
  recordConversion: publicProcedure
    .input(z.object({
      testId: z.number(),
      variant: z.enum(['A', 'B']),
      userId: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      await recordConversion(input.testId, input.variant, input.userId);
      return { success: true };
    })
});
