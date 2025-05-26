import { Either, left, right } from '@/core/either'
import { OnlineUser } from '../../enterprise/entities/online-user'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnlineUsersRepository } from '../repositories/online-users.repository'
import { UsersRepository } from '@/domain/app/application/repositories/users.repository'

interface ConnectUserUseCaseRequest {
  userId: string
  socketId: string
}

type ConnectUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    onlineUser: OnlineUser
  }
>

export class ConnectUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private onlineUsersRepository: OnlineUsersRepository
  ) {}

  async execute({
    userId,
    socketId
  }: ConnectUserUseCaseRequest): Promise<ConnectUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const onlineUser = OnlineUser.create({
      userId: new UniqueEntityID(userId),
      socketId,
      role: user.role
    })

    await this.onlineUsersRepository.add(onlineUser)

    return right({
      onlineUser
    })
  }
}
