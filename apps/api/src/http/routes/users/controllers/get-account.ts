import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserUseCase } from '@/use-cases/factories/GetUserUseCase'
import { GetUserRequestSchema } from '@/use-cases/User/GetUser/GetUserDTO'

import { BadRequestError } from '../../_errors/bad-request-error'

export async function getAccount(request: FastifyRequest, reply: FastifyReply) {
  const body = GetUserRequestSchema.parse(request.body)

  const { id } = body

  const getAccount = makeGetUserUseCase()

  try {
    await getAccount.execute({ id })

    return reply.status(201).send()
  } catch (error) {
    throw new BadRequestError()
  }
}
