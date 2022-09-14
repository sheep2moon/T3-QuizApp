import * as trpc from '@trpc/server';
import { createRouter } from "./context";

export const quizRouter = createRouter()
  .query("getCategories", {
    async resolve({ctx}){
      const res = await ctx.prisma.category.findMany() 
      return res
    }
  })
  