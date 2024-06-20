import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'

import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase'
import { GetUserUseCase } from './GetUserUseCase'

describe('GetUser Use Case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let getUserUseCase: GetUserUseCase

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    getUserUseCase = new GetUserUseCase(userRepository)
  })

  it('should retrieve a user by ID', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    const newUser = await userRepository.findByEmail('johndoe@example.com')

    if (!newUser) {
      throw new Error('User not found')
    }

    const user = await getUserUseCase.execute({ id: newUser.id })

    expect(user).toBeDefined()
  })

  it('should throw an error if the user does not exist', async () => {
    await expect(
      getUserUseCase.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow('User not found')
  })
})
