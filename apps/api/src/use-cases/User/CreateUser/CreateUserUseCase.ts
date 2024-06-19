import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import type { IUserRepository } from '@/repositories/IUserRepository'

import type { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const { email, password, role, name } = data
    const passwordHash = await hash(password, 6)
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new BadRequestError('User already exists')
    }

    await this.userRepository.create({
      id: randomUUID(),
      email,
      passwordHash,
      role,
      name,
    })
  }
}
