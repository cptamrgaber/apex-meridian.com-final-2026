import { router, publicProcedure } from "./_trpc";

export const socialAnalyticsRouter = router({
  getStats: publicProcedure.query(() => {
    return { views: 0, engagement: 0, followers: 0 };
  }),
});
