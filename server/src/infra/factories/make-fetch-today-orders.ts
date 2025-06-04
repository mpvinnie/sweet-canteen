import { FetchTodayOrdersUseCase } from '@/domain/app/application/use-cases/fetch-today-orders'
import { PrismaOrdersRepository } from '../database/prisma/repositories/prisma-orders.repository'
import { DayjsDateProvider } from '../providers/dayjs-date.provider'

export function makeFetchTodayOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const dateProvider = new DayjsDateProvider()
  return new FetchTodayOrdersUseCase(ordersRepository, dateProvider)
}
