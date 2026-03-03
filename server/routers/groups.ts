import { router, publicProcedure } from "./_trpc";
export const groupsRouter = router({
  list: publicProcedure.query(() => []),
});
