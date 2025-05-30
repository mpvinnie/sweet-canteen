import { RegisterProductUseCase } from '@/domain/app/application/use-cases/register-product'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'
import { PrismaCategoriesRepository } from '../database/prisma/repositories/prisma-categories.repository'

export function makeRegisterProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const categoriesRepository = new PrismaCategoriesRepository()
  return new RegisterProductUseCase(productsRepository, categoriesRepository)
}
