import { Either, left, right } from '@/core/either'
import { CooksRepository } from '../repositories/cooks.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface DeleteCookUseCaseRequest {
  cookId: string
}

type DeleteCookUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteCookUseCase {
  constructor(private cooksRepository: CooksRepository) {}

  async execute({
    cookId
  }: DeleteCookUseCaseRequest): Promise<DeleteCookUseCaseResponse> {
    const cook = await this.cooksRepository.findById(cookId)

    if (!cook) {
      return left(new ResourceNotFoundError())
    }

    await this.cooksRepository.delete(cook)

    return right({})
  }
}
