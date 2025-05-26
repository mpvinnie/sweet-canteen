import { Either, left, right } from '@/core/either'
import { Cook } from '../../enterprise/entities/cook'
import { CooksRepository } from '../repositories/cooks.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface GetCookByUsernameUseCaseRequest {
  username: string
}

type GetCookByUsernameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    cook: Cook
  }
>

export class GetCookByUsernameUseCase {
  constructor(private cooksRepository: CooksRepository) {}

  async execute({
    username
  }: GetCookByUsernameUseCaseRequest): Promise<GetCookByUsernameUseCaseResponse> {
    const cook = await this.cooksRepository.findByUsername(username)

    if (!cook) {
      return left(new ResourceNotFoundError())
    }

    return right({
      cook
    })
  }
}
