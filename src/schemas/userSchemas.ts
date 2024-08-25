import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
})

export const userIdSchema = z.object({
  userId: z.string().regex(/^\d+$/),
})
