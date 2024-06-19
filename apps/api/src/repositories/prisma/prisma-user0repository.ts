import { User } from '@/entities/User'
import { prisma } from '@/lib/prisma'

import type { IUserRepository } from '../IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  findById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(user: User): Promise<void> {
    const { id, name, email, passwordHash, role } = user

    await prisma.user.create({
      data: {
        id,
        name,
        email,
        passwordHash,
        role,
      },
    })
  }
}
