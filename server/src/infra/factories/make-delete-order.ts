import { DeleteOrderUseCase } from '@/domain/app/application/use-cases/delete-order'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'

export function makeDeleteOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  return new DeleteOrderUseCase(ordersRepository)
}
