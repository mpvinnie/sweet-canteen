import { EditProductUseCase } from '@/domain/app/application/use-cases/edit-product'
import { PrismaCategoriesRepository } from '../database/prisma/repositories/prisma-categories.repository'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function makeEditProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const categoriesRepository = new PrismaCategoriesRepository()
  return new EditProductUseCase(productsRepository, categoriesRepository)
}
