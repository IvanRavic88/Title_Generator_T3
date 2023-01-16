import { createTRPCRouter } from "./trpc";
import { youtubeRouter } from "./routers/youtubeRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  youtube: youtubeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
