import { Either, right } from '@/core/either'
import { Cook } from '../../enterprise/entities/cook'
import { CooksRepository } from '../repositories/cooks.repository'

interface FetchCooksUseCaseRequest {
  name?: string
  page: number
}

type FetchCooksUseCaseResponse = Either<
  null,
  {
    cooks: Cook[]
  }
>

export class FetchCooksUseCase {
  constructor(private cooksRepository: CooksRepository) {}

  async execute({
    name,
    page
  }: FetchCooksUseCaseRequest): Promise<FetchCooksUseCaseResponse> {
    const cooks = await this.cooksRepository.findMany({ name }, { page })

    return right({ cooks })
  }
}
