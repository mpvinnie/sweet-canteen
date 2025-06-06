import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { OnlineUsersRepository } from '../repositories/online-users.repository'

interface DisconnectUserUseCaseRequest {
  socketId: string
}

type DisconnectUserUseCaseResponse = Either<ResourceNotFoundError, null>

export class DisconnectUserUseCase {
  constructor(private onlineUsersRepository: OnlineUsersRepository) {}

  async execute({
    socketId
  }: DisconnectUserUseCaseRequest): Promise<DisconnectUserUseCaseResponse> {
    await this.onlineUsersRepository.removeBySocketId(socketId)

    return right(null)
  }
}
