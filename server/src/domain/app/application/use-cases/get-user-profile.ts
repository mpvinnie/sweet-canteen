import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'

interface GetUserProfileRequest {
  id: string
}

type GetUserProfileResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user
    })
  }
}
