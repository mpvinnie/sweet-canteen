import { RegisterOrderUseCase } from '@/domain/app/application/use-cases/register-order'
import { PrismaAttendantsRepository } from '../database/prisma/repositories/prisma-attendants.repository'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products.repository'

export function MakeRegisterOrderUseCase() {
  const attendantsRepository = new PrismaAttendantsRepository()
  const productsRepository = new PrismaProductsRepository()
  const ordersRepository = new PrismaOrdersRepository()
  return new RegisterOrderUseCase(
    attendantsRepository,
    productsRepository,
    ordersRepository
  )
}
