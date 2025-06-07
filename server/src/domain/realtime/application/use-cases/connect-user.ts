import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Role } from '@/core/types/role'
import { OnlineUsersRepository } from '../repositories/online-users.repository'
import { OnlineUser } from './value-objects/online-user'

interface ConnectUserUseCaseRequest {
  userId: string
  socketId: string
  role: Role
}

type ConnectUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    onlineUser: OnlineUser
  }
>

export class ConnectUserUseCase {
  constructor(private onlineUsersRepository: OnlineUsersRepository) {}

  async execute({
    userId,
    role,
    socketId
  }: ConnectUserUseCaseRequest): Promise<ConnectUserUseCaseResponse> {
    const onlineUser = OnlineUser.create({
      userId: new UniqueEntityID(userId),
      socketId,
      role
    })

    await this.onlineUsersRepository.add(onlineUser)

    return right({
      onlineUser
    })
  }
}
