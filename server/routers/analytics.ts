import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { trackEvent, getAnalytics } from "../lib/analytics";
import { updateLeadScore, getTopLeads } from "../lib/leadScoring";

export const analyticsRouter = router({
  trackPersonaSelection: publicProcedure
    .input(z.object({
      personaType: z.string(),
      userEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      await trackEvent({
        eventType: 'persona_selection',
        personaType: input.personaType,
        userEmail: input.userEmail,
      });

      // Update lead score (+10 points) if email provided
      if (input.userEmail) {
        await updateLeadScore(input.userEmail, 'persona_selection');
      }

      return { success: true };
    }),

  trackResourceDownload: publicProcedure
    .input(z.object({
      resourceType: z.string(),
      resourceId: z.string(),
      userEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      await trackEvent({
        eventType: 'resource_download',
        resourceType: input.resourceType,
        resourceId: input.resourceId,
        userEmail: input.userEmail,
      });

      // Update lead score (+5 points) if email provided
      if (input.userEmail) {
        await updateLeadScore(input.userEmail, 'resource_download');
      }

      return { success: true };
    }),

  getAnalytics: protectedProcedure
    .input(z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const startDate = input.startDate ? new Date(input.startDate) : undefined;
      const endDate = input.endDate ? new Date(input.endDate) : undefined;
      
      const analytics = await getAnalytics(startDate, endDate);
      return analytics;
    }),

  getTopLeads: protectedProcedure
    .input(z.object({
      limit: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const leads = await getTopLeads(input.limit || 10);
      return leads;
    }),
});
