import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { CreateUserRequestSchema } from '@/use-cases/User/CreateUser/CreateUserDTO'

import { createAccount } from './controllers/create-account'

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['user'],
        summary: 'Create a new account',
        body: CreateUserRequestSchema,
      },
    },
    createAccount,
  )
}
