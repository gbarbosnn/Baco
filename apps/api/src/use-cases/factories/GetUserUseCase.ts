import { PrismaUserRepository } from '@/repositories/prisma/prisma-user0repository'

import { GetUserUseCase } from '../User/GetUser/GetOne/GetUserUseCase'

export function makeGetUserUseCase() {
  const repository = new PrismaUserRepository()
  return new GetUserUseCase(repository)
}
