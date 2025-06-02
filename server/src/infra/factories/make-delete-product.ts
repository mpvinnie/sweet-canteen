import { DeleteProductUseCase } from '@/domain/app/application/use-cases/delete-product'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function makeDeleteProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  return new DeleteProductUseCase(productsRepository)
}
