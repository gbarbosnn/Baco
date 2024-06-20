import z from 'zod'

import type { UserResponse } from '@/entities/User'

export const GetAllUserRequestSchema = z.object({
  page: z.number().int().min(1, { message: 'The page number must be at least 1' }),
  name: z.string().optional(),
  orderBy: z.union([
    z.literal('name'),
    z.literal('email'),
    z.literal('created_at'),
  ],).optional(),
})

export type IGetAllUserRequestDTO = z.infer<typeof GetAllUserRequestSchema>

export type IGetAllUserResponseDTO = UserResponse

export interface GetAllUserQuery {
  page: string
  name?: string;
  orderBy?: "name" | "email" | "created_at"
}

export const GetAllUserQuerySchema = z.object({
  page: z.string(),
  name: z.string().optional(),
  orderBy: z.union([
    z.literal('name'),
    z.literal('email'),
    z.literal('created_at'),
  ]).optional(),
})
