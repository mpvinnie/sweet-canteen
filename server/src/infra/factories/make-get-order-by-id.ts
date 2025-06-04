import { GetOrderByIdUseCase } from '@/domain/app/application/use-cases/get-order-by-id'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'

export function makeGetOrderByIdUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  return new GetOrderByIdUseCase(ordersRepository)
}
