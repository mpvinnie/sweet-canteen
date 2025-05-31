import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Attendant } from '../../enterprise/entities/attendant'
import { HashProvider } from '../providers/hash.provider'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

interface EditAttendantUseCaseRequest {
  attendantId: string
  name: string
  username?: string
  password?: string
}

type EditAttendantUseCaseResponse = Either<
  ResourceNotFoundError | InvalidUsernameError | UsernameAlreadyTakenError,
  {
    attendant: Attendant
  }
>

export class EditAttendantUseCase {
  constructor(
    private attendantsRepository: AttendantsRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    attendantId,
    name,
    username,
    password
  }: EditAttendantUseCaseRequest): Promise<EditAttendantUseCaseResponse> {
    const attendant = await this.attendantsRepository.findById(attendantId)

    if (!attendant) {
      return left(new ResourceNotFoundError())
    }

    if (username) {
      const newUsername = Username.create(username)

      if (newUsername.isLeft()) {
        return left(newUsername.value)
      }

      const existingAttendant =
        await this.attendantsRepository.findByUsername(username)

      if (existingAttendant) {
        return left(new UsernameAlreadyTakenError())
      }

      attendant.username = newUsername.value
    }

    if (password) {
      const passwordHash = await this.hashProvider.hash(password)

      attendant.passwordHash = passwordHash
    }

    attendant.name = name

    await this.attendantsRepository.save(attendant)

    return right({
      attendant
    })
  }
}
