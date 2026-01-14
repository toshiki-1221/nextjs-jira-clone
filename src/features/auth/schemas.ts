import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'メールアドレスが不正です。' }),
  password: z.string().min(1, { message: 'パスワードは必須です。' }),
})

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: 'お名前は必須です。' }),
  email: z.email({ message: 'メールアドレスが不正です。' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください。' }),
})
