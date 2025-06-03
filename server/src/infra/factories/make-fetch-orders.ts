import { FetchOrdersUseCase } from '@/domain/app/application/use-cases/fetch-orders'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'

export function makeFetchOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  return new FetchOrdersUseCase(ordersRepository)
}
