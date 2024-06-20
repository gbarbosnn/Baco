import { FastifyReply, FastifyRequest } from 'fastify'
import { describe, expect, it, vi } from 'vitest'

import { GetUserRequestSchema } from '@/use-cases/User/GetUser/GetOne/GetUserDTO'

import { getAccount } from './get-account'

vi.mock('./get-account', () => ({
  getAccount: vi.fn().mockImplementation(async (request, reply) => {
    reply.status(201).send()
  }),
}))

describe('getAccount Controller', () => {
  it('should get a user', async () => {
    const mockRequest = {
      body: {
        id: '7d8bc15f-f711-484a-a9c7-55d912eea59d',
      },
    } as FastifyRequest

    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue(undefined),
    } as unknown as FastifyReply

    const getAccountMocked = vi.mocked(getAccount)

    await getAccount(mockRequest, mockReply)

    expect(mockReply.status).toHaveBeenCalledWith(201)
    expect(mockReply.send).toHaveBeenCalled()
    expect(getAccountMocked).toHaveBeenCalledTimes(1)
    expect(() => GetUserRequestSchema.parse(mockRequest.body)).not.toThrow()
  })
})
