import { GetProductByIdUseCase } from '@/domain/app/application/use-cases/get-product-by-id'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function makeGetProductByIdUseCase() {
  const productsRepository = new PrismaProductsRepository()
  return new GetProductByIdUseCase(productsRepository)
}
