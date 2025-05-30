import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users.repository'
import { WrongCredentialsError } from './errors/wrong-credentials.error'
import { HashProvider } from '../providers/hash.provider'
import { Role } from '@/core/types/role'

interface AuthenticateUserUseCaseRequest {
  username: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    payload: {
      userId: string
      role: Role
    }
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    username,
    password
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const doesPasswordMatches = await this.hashProvider.compare(
      password,
      user.passwordHash
    )

    if (!doesPasswordMatches) {
      return left(new WrongCredentialsError())
    }

    return right({
      payload: {
        userId: user.id.toString(),
        role: user.role
      }
    })
  }
}
