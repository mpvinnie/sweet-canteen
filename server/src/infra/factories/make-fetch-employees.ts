import { FetchEmployeesUseCase } from '@/domain/app/application/use-cases/fetch-employees'
import { PrismaEmployeesRepository } from '../database/prisma/repositories/prisma-employees.repository'

export function makeFetchEmployees() {
  const employeesRepository = new PrismaEmployeesRepository()
  return new FetchEmployeesUseCase(employeesRepository)
}
