import { Either, left, right } from '@/core/either'
import { Attendant } from '../../enterprise/entities/attendant'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { HashProvider } from '../providers/hash.provider'
import { Username } from './value-objects/username'
import { InvalidUsernameError } from './errors/invalid-username.error'

interface RegisterAttendantUseCaseRequest {
  name: string
  username: string
  password: string
}

type RegisterAttendantUseCaseResponse = Either<
  UsernameAlreadyTakenError | InvalidUsernameError,
  {
    attendant: Attendant
  }
>

export class RegisterAttendantUseCase {
  constructor(
    private attendantsRepository: AttendantsRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    name,
    username,
    password
  }: RegisterAttendantUseCaseRequest): Promise<RegisterAttendantUseCaseResponse> {
    const existingAttendant =
      await this.attendantsRepository.findByUsername(username)

    if (existingAttendant) {
      return left(new UsernameAlreadyTakenError())
    }

    const passwordHash = await this.hashProvider.hash(password)

    const usernameOrError = Username.create(username)

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    const attendant = Attendant.create({
      name,
      username: usernameOrError.value,
      passwordHash
    })

    await this.attendantsRepository.create(attendant)

    return right({
      attendant
    })
  }
}
