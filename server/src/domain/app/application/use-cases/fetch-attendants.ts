import { Either, right } from '@/core/either'
import { Attendant } from '../../enterprise/entities/attendant'
import { AttendantsRepository } from '../repositories/attendants.repository'

interface FetchAttendantsUseCaseRequest {
  name?: string
  page: number
}

type FetchAttendantsUseCaseResponse = Either<
  null,
  {
    attendants: Attendant[]
  }
>

export class FetchAttendantsUseCase {
  constructor(private attendantsRepository: AttendantsRepository) {}

  async execute({
    name,
    page
  }: FetchAttendantsUseCaseRequest): Promise<FetchAttendantsUseCaseResponse> {
    const attendants = await this.attendantsRepository.findMany(
      { name },
      { page }
    )

    return right({ attendants })
  }
}
