import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserUseCase } from '@/use-cases/factories/GetUserUseCase'
import { GetUserRequestSchema } from '@/use-cases/User/GetUser/GetOne/GetUserDTO'

import { BadRequestError } from '../../_errors/bad-request-error'

export async function getAccount(request: FastifyRequest, reply: FastifyReply) {
  const query = GetUserRequestSchema.parse(request.query)

  const userID = query.id

  const getAccount = makeGetUserUseCase()

  try {
    const { email, id, name, role } = await getAccount.execute({ id: userID })

    return reply.status(201).send({ email, id, name, role })
  } catch (error) {
    throw new BadRequestError()
  }
}
