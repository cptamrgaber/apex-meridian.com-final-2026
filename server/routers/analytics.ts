import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { trackEvent, getAnalytics } from "../lib/analytics";

export const analyticsRouter = router({
  trackPersonaSelection: publicProcedure
    .input(z.object({
      personaType: z.string(),
    }))
    .mutation(async ({ input }) => {
      await trackEvent({
        eventType: 'persona_selection',
        personaType: input.personaType,
      });
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
});
