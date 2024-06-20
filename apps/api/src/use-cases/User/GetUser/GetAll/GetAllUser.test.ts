import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'

import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase'
import { GetAllUserUseCase } from './GetAllUserUseCase'
import { array } from 'zod'

describe('GetUser Use Case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let getAllUserUseCase: GetAllUserUseCase

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    getAllUserUseCase = new GetAllUserUseCase(userRepository)
  })

  it('should get all users', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoeasd@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoeasda@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    const result = await userRepository.getAll(1)

    expect(result).toBeDefined()
    expect(result).toHaveProperty('totalUsers', 3);
    expect(result).toHaveProperty('users', expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String),
        id: expect.any(String),
        name: expect.any(String),
        role: expect.any(String),
      })]))
  })

  it('should get all users with j in name', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    await createUserUseCase.execute({
      name: 'Mary Doe',
      email: 'johndoeasd@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoeasda@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    const name = 'j'
    const result = await userRepository.getAll(1, name)

    expect(result).toBeDefined()
    expect(result).toHaveProperty('totalUsers', 2);
    expect(result).toHaveProperty('users', expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String),
        id: expect.any(String),
        name: expect.any(String).toContain('j'),
        role: expect.any(String),
      })]))
  })
})
