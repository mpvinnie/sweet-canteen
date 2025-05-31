import { ToggleProductAvailabilityUseCase } from '@/domain/app/application/use-cases/toggle-product-availability'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function makeToggleProductAvailability() {
  const productsRepository = new PrismaProductsRepository()
  return new ToggleProductAvailabilityUseCase(productsRepository)
}
