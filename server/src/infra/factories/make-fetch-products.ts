import { FetchProductsUseCase } from '@/domain/app/application/use-cases/fetch-products'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function makeFetchProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  return new FetchProductsUseCase(productsRepository)
}
