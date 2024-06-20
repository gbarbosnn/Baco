import type { User, UserResponse } from '@/entities/User'

export interface IUserRepository {
  create(data: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  getAll(pagina: number, name?: string, orderBy?: string): Promise<{ users: UserResponse[], totalUsers: number }>
  delete(id: string): Promise<void>
}
