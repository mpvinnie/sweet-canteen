import { Either, left, right } from '@/core/either'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface DeleteAttendantUseCaseRequest {
  attendantId: string
}

type DeleteAttendantUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteAttendantUseCase {
  constructor(private attendantsRepository: AttendantsRepository) {}

  async execute({
    attendantId
  }: DeleteAttendantUseCaseRequest): Promise<DeleteAttendantUseCaseResponse> {
    const attendant = await this.attendantsRepository.findById(attendantId)

    if (!attendant) {
      return left(new ResourceNotFoundError())
    }

    await this.attendantsRepository.delete(attendant)

    return right({})
  }
}
