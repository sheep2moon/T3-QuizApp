import { imagesRouter } from './images';
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedRouter } from "./protected";
import { quizRouter } from "./quizzes";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("quizzes.",quizRouter)
  .merge("protected.", protectedRouter)
  .merge("images.", imagesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
