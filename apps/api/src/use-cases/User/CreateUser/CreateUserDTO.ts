import z from 'zod'

import type { User } from '@/entities/User'

export const CreateUserRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty' })
    .max(255, { message: 'Name must be no longer than 255 characters' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(8, { message: 'Password must be no longer than 8 characters' }),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  role: z.enum(['ADMIN', 'MEMBER']),
})

export type ICreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>

export type ICreateUserResponseDTO = User
