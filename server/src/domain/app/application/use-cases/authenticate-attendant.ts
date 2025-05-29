import { Either, left, right } from '@/core/either'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { WrongCredentialsError } from './errors/wrong-credentials.error'
import { HashProvider } from '../providers/hash.provider'
import { Role } from '@/core/types/role'

interface AuthenticateAttendantUseCaseRequest {
  username: string
  password: string
}

type AuthenticateAttendantUseCaseResponse = Either<
  WrongCredentialsError,
  {
    payload: {
      userId: string
      role: Role
    }
  }
>

export class AuthenticateAttendantUseCase {
  constructor(
    private attendantsRepository: AttendantsRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    username,
    password
  }: AuthenticateAttendantUseCaseRequest): Promise<AuthenticateAttendantUseCaseResponse> {
    const attendant = await this.attendantsRepository.findByUsername(username)

    if (!attendant) {
      return left(new WrongCredentialsError())
    }

    const doesPasswordMatches = await this.hashProvider.compare(
      password,
      attendant.passwordHash
    )

    if (!doesPasswordMatches) {
      return left(new WrongCredentialsError())
    }

    return right({
      payload: {
        userId: attendant.id.toString(),
        role: attendant.role
      }
    })
  }
}
