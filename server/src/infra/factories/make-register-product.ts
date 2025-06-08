import { RegisterProductUseCase } from '@/domain/app/application/use-cases/register-product'
import { PrismaCategoriesRepository } from '../database/prisma/repositories/prisma-categories.repository'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'
import { DiskStorageProvider } from '../providers/disk-storage.provider'

export function makeRegisterProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const categoriesRepository = new PrismaCategoriesRepository()
  const storageProvider = new DiskStorageProvider()
  return new RegisterProductUseCase(
    productsRepository,
    categoriesRepository,
    storageProvider
  )
}
