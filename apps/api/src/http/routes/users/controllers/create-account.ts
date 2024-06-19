import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateUserUseCase } from '@/use-cases/factories/CreateUserUseCase'
import { CreateUserRequestSchema } from '@/use-cases/User/CreateUser/CreateUserDTO'

import { BadRequestError } from '../../_errors/bad-request-error'

export async function createAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = CreateUserRequestSchema.parse(request.body)

  const { name, email, password, role } = body

  const createAccount = makeCreateUserUseCase()

  try {
    await createAccount.execute({ name, email, password, role })

    return reply.status(201).send()
  } catch (error) {
    throw new BadRequestError()
  }
}
