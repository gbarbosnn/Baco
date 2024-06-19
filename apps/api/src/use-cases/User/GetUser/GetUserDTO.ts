import z from 'zod'

import type { User } from '@/entities/User'

export const GetUserRequestSchema = z.object({
  id: z.string().uuid({ message: 'Invalid id format' }),
})

export type IGetUserRequestDTO = z.infer<typeof GetUserRequestSchema>

export type IGetUserResponseDTO = User
