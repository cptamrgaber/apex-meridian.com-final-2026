import { router, publicProcedure } from "./_trpc";
export const reportingRouter = router({
  getReports: publicProcedure.query(() => []),
});
