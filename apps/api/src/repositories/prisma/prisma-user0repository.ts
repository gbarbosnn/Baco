import type { User, UserResponse } from '@/entities/User'
import { prisma } from '@/lib/prisma'

import type { IUserRepository } from '../IUserRepository'
import type { Prisma } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {

  async getAll(page: number, name?: string, orderBy?: string): Promise<{ users: UserResponse[]; totalUsers: number }> {

    const orderByClause: Prisma.UserOrderByWithRelationInput = orderBy ? {
      [orderBy]: 'asc'
    } : {
      name: 'asc'
    }

    const whereClause: Prisma.UserWhereInput = name ? {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    } : {};


    const [users, totalUsers] = await prisma.$transaction([
      prisma.user.findMany({
        skip: (page - 1) * 5,
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: orderByClause,
        where: whereClause,
      }),

      prisma.user.count({
        where: whereClause,
      }),
    ]);

    return { users, totalUsers };
  }


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
