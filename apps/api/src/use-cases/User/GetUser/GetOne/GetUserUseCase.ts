import { User } from '@/entities/User'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import type { IUserRepository } from '@/repositories/IUserRepository'

import type { IGetUserRequestDTO } from './GetUserDTO'

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IGetUserRequestDTO): Promise<User> {
    const idUser = data.id

    const user = await this.userRepository.findById(idUser)

    if (!user) {
      throw new BadRequestError('User not found')
    }



    return user
  }
}
