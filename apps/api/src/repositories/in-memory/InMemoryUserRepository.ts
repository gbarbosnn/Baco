import type { User, UserResponse } from '@/entities/User'

import type { IUserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  getAll(page: number, name?: string, orderBy?: string): Promise<{ users: UserResponse[]; totalUsers: number }> {
    const users = this.users
      .filter((user) => {
        if (name) {
          return user.name.toLowerCase().includes(name.toLowerCase())
        }

        return true
      })
      .sort((a, b) => {
        if (orderBy === 'name') {
          return a.name.localeCompare(b.name)
        }

        return 0
      })
      .slice((page - 1) * 10, page * 10)
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }))

    return Promise.resolve({ users, totalUsers: this.users.length })
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return Promise.resolve(null)
    }

    return Promise.resolve(user)
  }

  delete(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id)

    if (user) {
      this.users.splice(this.users.indexOf(user), 1)
    }

    return Promise.resolve()
  }

  create(user: User): Promise<void> {
    this.users.push(user)
    return Promise.resolve()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return Promise.resolve(user)
  }
}
