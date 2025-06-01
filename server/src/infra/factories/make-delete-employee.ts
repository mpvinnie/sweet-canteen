import { DeleteEmployeeUseCase } from '@/domain/app/application/use-cases/delete-employee'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'

export function makeDeleteEmployeeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new DeleteEmployeeUseCase(usersRepository)
}
