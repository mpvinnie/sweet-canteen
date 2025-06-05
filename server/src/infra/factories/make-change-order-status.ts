import { ChangeOrderStatusUseCase } from '@/domain/app/application/use-cases/change-order-status'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'

export function makeChangeOrderStatusUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  return new ChangeOrderStatusUseCase(ordersRepository)
}
