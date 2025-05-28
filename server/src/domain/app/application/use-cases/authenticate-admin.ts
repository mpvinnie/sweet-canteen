import { Either, left, right } from '@/core/either'
import { AdminsRepository } from '../repositories/admins.repository'
import { WrongCredentialsError } from './errors/wrong-credentials.error'
import { HashProvider } from '../providers/hash.provider'
import { Role } from '@/core/types/role'

interface AuthenticateAdminUseCaseRequest {
  username: string
  password: string
}

type AuthenticateAdminUseCaseResponse = Either<
  WrongCredentialsError,
  {
    payload: {
      userId: string
      role: Role
    }
  }
>

export class AuthenticateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    username,
    password
  }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.adminsRepository.findByUsername(username)

    if (!admin) {
      return left(new WrongCredentialsError())
    }

    const doesPasswordMatches = await this.hashProvider.compare(
      password,
      admin.passwordHash
    )

    if (!doesPasswordMatches) {
      return left(new WrongCredentialsError())
    }

    return right({
      payload: {
        userId: admin.id.toString(),
        role: admin.role
      }
    })
  }
}
