import { router, publicProcedure } from "./_trpc";
export const notificationPreferencesRouter = router({
  get: publicProcedure.query(() => ({})),
});
