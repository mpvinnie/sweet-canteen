import { GetCookByIdUseCase } from '@/domain/app/application/use-cases/get-cook-by-id'
import { PrismaCooksRepository } from '../database/prisma/repositories/prisma-cooks.repository'

export function makeGetCookByIdUseCase() {
  const cooksRepository = new PrismaCooksRepository()
  return new GetCookByIdUseCase(cooksRepository)
}
