import { router, publicProcedure } from "./_trpc";
export const callsRouter = router({
  list: publicProcedure.query(() => []),
});
