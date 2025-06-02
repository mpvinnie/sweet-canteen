import { EditEmployeeUseCase } from '@/domain/app/application/use-cases/edit-employee'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'

export function makeEditEmployeeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()
  return new EditEmployeeUseCase(usersRepository, hashProvider)
}
