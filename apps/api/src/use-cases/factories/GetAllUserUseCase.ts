import { PrismaUserRepository } from '@/repositories/prisma/prisma-user0repository'

import { GetAllUserUseCase } from '../User/GetUser/GetAll/GetAllUserUseCase'

export function makeGetAllUserUseCase() {
  const repository = new PrismaUserRepository()
  return new GetAllUserUseCase(repository)
}
