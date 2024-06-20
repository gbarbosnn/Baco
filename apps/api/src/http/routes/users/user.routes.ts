import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { CreateUserRequestSchema } from '@/use-cases/User/CreateUser/CreateUserDTO'

import { createAccount } from './controllers/create-account'
import { GetAllUserQuerySchema } from '@/use-cases/User/GetUser/GetAll/GetAllUserDTO'
import { getAllUsersAccount } from './controllers/get-all-accounts'
import { getAccount } from './controllers/get-account'

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
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        tags: ['user'],
        summary: 'Get all user accounts',
        querystring: GetAllUserQuerySchema,
      },
    },
    getAllUsersAccount,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/id:',
    {
      schema: {
        tags: ['user'],
        summary: 'Get user accounts',
        querystring: GetAllUserQuerySchema,
      },
    },
    getAccount,
  )
}


