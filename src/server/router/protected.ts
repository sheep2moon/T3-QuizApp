import { z } from "zod";
import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedRouter = createProtectedRouter()
  .mutation("createQuiz", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      imageId: z.string(),
      categoryId: z.string()
    }),
    async resolve({ input, ctx }) {
      
      const res = ctx.prisma.quiz.create({
        data: {
          title: input.title,
          imageId: input.imageId,
          categoryId: input.categoryId,
          userId: ctx.session.user.id
        }
      })
      console.log(res);
      return res
    },
  })
  .mutation("createCategory",{
    input: z.object({
      name: z.string(),
      imageId: z.string()
    }),
    async resolve({input,ctx}){
      const res = await ctx.prisma.category.create({data:{
        name: input.name,
        imageId: input.imageId 
      }})
      return res
    }
  })
  .mutation("createQuestion",{
    input: z.object({
      title: z.string(),
      quizId: z.string(),
      answerA: z.string(),
      answerB: z.string(),
      answerC: z.string(),
      answerD: z.string(),
      correctAnswer: z.string(),
      imageId: z.string(),
    }),
    async resolve({input,ctx}){
      const res = await ctx.prisma.question.create({
        data: {
          quizId: input.quizId,
          title: input.title,
          answerA: input.answerA,
          answerB: input.answerB,
          answerC: input.answerC,
          answerD: input.answerD,
          correctAnswer: input.correctAnswer,
          imageId: input.imageId
        }
      })
      return res
    }
  })
  