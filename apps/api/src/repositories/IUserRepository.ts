import { User } from '@/entities/User'

export interface IUserRepository {
  create(data: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(id: string): Promise<void>
}
