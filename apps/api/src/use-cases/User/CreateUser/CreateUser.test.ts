import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { InMemoryUserRepository } from '@/repositories/in-memory/InMemoryUserRepository'

import { CreateUserUseCase } from './CreateUserUseCase'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('CreateUser', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should to create a user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    expect(user)
  })

  it('should hash user password upon registration', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    const user = await userRepository.findByEmail('johndoe@example.com')

    if (!user) {
      throw new Error('User not found')
    }

    const { passwordHash } = user

    const isPasswordCorrectlyHashed = await compare('123456', passwordHash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not create a user if the email already exists', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })

    await expect(
      sut.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: 'abcdef',
        role: 'MEMBER',
      }),
    ).rejects.toThrow(BadRequestError)
  })

  it('should call the user repository to create a user', async () => {
    const spy = vi.spyOn(userRepository, 'create')
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'MEMBER',
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
