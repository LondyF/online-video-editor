// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { projectRouter } from "./project";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
