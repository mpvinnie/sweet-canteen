import { FetchEmployeesUseCase } from '@/domain/app/application/use-cases/fetch-employees'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'

export function makeFetchEmployees() {
  const usersRepository = new PrismaUsersRepository()
  return new FetchEmployeesUseCase(usersRepository)
}
