import type { User } from '@/entities/User'

import type { IUserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

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
