import { PrismaUserRepository } from '@/repositories/prisma/prisma-user0repository'

import { CreateUserUseCase } from '../User/CreateUser/CreateUserUseCase'

export function makeCreateUserUseCase() {
  const repository = new PrismaUserRepository()
  return new CreateUserUseCase(repository)
}
