import type { UserResponse } from '@/entities/User'
import type { IUserRepository } from '@/repositories/IUserRepository'

import type { IGetAllUserRequestDTO } from './GetAllUserDTO'

export class GetAllUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IGetAllUserRequestDTO): Promise<{ users: UserResponse[], totalPages: number }> {
    const { page, name, orderBy } = data


    const { users, totalUsers } = await this.userRepository.getAll(page, name, orderBy)


    const totalPages = Math.ceil(totalUsers / 5)

    return { users, totalPages }
  }
}
