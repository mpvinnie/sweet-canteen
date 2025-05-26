import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { OnlineUsersRepository } from '../repositories/online-users.repository'

interface DisconnectUserUseCaseRequest {
  userId: string
}

type DisconnectUserUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DisconnectUserUseCase {
  constructor(private onlineUsersRepository: OnlineUsersRepository) {}

  async execute({
    userId
  }: DisconnectUserUseCaseRequest): Promise<DisconnectUserUseCaseResponse> {
    await this.onlineUsersRepository.removeByUserId(userId)

    return right({})
  }
}
