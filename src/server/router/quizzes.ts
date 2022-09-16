import * as trpc from '@trpc/server';
import { z } from "zod";
import { createRouter } from "./context";

export const quizRouter = createRouter()
  .query("getCategories", {
    async resolve({ctx}){
      const categories = await ctx.prisma.category.findMany() 
      return categories
    }
  })
  .query("getQuizzes",{
    async resolve({ctx}){
      const quizzes = await ctx.prisma.quiz.findMany()
      return quizzes
    }
  })
  .query("getQuizById",{
    input: z.object({
      id: z.string()
    }),
    async resolve({input,ctx}){
      const res = await ctx.prisma.quiz.findFirst({where:{id: input.id}, include: {questions: true}})
      return res
    }
  })
  