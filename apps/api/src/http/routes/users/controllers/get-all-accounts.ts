import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetAllUserUseCase } from '@/use-cases/factories/GetAllUserUseCase'
import { GetAllUserRequestSchema, GetAllUserQuery } from '@/use-cases/User/GetUser/GetAll/GetAllUserDTO'

import { BadRequestError } from '../../_errors/bad-request-error'
export async function getAllUsersAccount(request: FastifyRequest<{ Querystring: GetAllUserQuery }>, reply: FastifyReply) {
  try {

    const query = {
      page: parseInt(request.query.page),
      name: request.query.name,
      orderBy: request.query.orderBy
    };


    const data = GetAllUserRequestSchema.parse(query);

    const { page, name, orderBy } = data;

    const getAllUsers = makeGetAllUserUseCase();

    const response = await getAllUsers.execute({ page, name, orderBy });



    return reply.status(201).send(response);
  } catch (error) {
    throw new BadRequestError();
  }
}