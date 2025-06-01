import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Cook } from '../../enterprise/entities/cook'
import { CooksRepository } from '../repositories/cooks.repository'

interface GetCookByIdUseCaseRequest {
  id: string
}

type GetCookByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    cook: Cook
  }
>

export class GetCookByIdUseCase {
  constructor(private cooksRepository: CooksRepository) {}

  async execute({
    id
  }: GetCookByIdUseCaseRequest): Promise<GetCookByIdUseCaseResponse> {
    const cook = await this.cooksRepository.findById(id)

    if (!cook) {
      return left(new ResourceNotFoundError())
    }

    return right({
      cook
    })
  }
}
