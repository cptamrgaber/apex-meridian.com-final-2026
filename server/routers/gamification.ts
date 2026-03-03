import { router, publicProcedure } from "./_trpc";

export const gamificationRouter = router({
  getPoints: publicProcedure.query(() => {
    return { points: 0, level: 1, badges: [] };
  }),
});
