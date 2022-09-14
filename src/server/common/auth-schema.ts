import { z } from "zod";


export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6).max(12)

})

export const signUpSchema = loginSchema.extend({
    username: z.string()
})

export type ILogin = z.infer<typeof loginSchema>
export type ISignUp = z.infer<typeof signUpSchema>
