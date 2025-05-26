import { Either, left, right } from '@/core/either'
import { Attendant } from '../../enterprise/entities/attendant'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface GetAttendantByUsernameUseCaseRequest {
  username: string
}

type GetAttendantByUsernameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    attendant: Attendant
  }
>

export class GetAttendantByUsernameUseCase {
  constructor(private attendantsRepository: AttendantsRepository) {}

  async execute({
    username
  }: GetAttendantByUsernameUseCaseRequest): Promise<GetAttendantByUsernameUseCaseResponse> {
    const attendant = await this.attendantsRepository.findByUsername(username)

    if (!attendant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      attendant
    })
  }
}
