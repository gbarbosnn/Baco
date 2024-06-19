import { FastifyReply, FastifyRequest } from 'fastify'
import { describe, expect, it, vi } from 'vitest'

import { CreateUserRequestSchema } from '@/use-cases/User/CreateUser/CreateUserDTO'

import { createAccount } from './create-account'

vi.mock('./create-account', () => ({
  createAccount: vi.fn().mockImplementation(async (_, reply) => {
    reply.status(201).send()
  }),
}))

describe('createAccount Controller', () => {
  it('should create a new user and return a 201 status', async () => {
    const mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '1234567',
        role: 'MEMBER',
      },
    } as FastifyRequest

    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue(undefined),
    } as unknown as FastifyReply

    const createAccountMocked = vi.mocked(createAccount)

    await createAccount(mockRequest, mockReply)

    expect(mockReply.status).toHaveBeenCalledWith(201)
    expect(mockReply.send).toHaveBeenCalled()
    expect(createAccountMocked).toHaveBeenCalledTimes(1)
    expect(() => CreateUserRequestSchema.parse(mockRequest.body)).not.toThrow()
  })
})
