import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Attendant } from '../../enterprise/entities/attendant'
import { AttendantsRepository } from '../repositories/attendants.repository'

interface GetAttendantByIdUseCaseRequest {
  id: string
}

type GetAttendantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    attendant: Attendant
  }
>

export class GetAttendantByIdUseCase {
  constructor(private attendantsRepository: AttendantsRepository) {}

  async execute({
    id
  }: GetAttendantByIdUseCaseRequest): Promise<GetAttendantByIdUseCaseResponse> {
    const attendant = await this.attendantsRepository.findById(id)

    if (!attendant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      attendant
    })
  }
}
