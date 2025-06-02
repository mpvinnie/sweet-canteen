import { RegisterEmployeeUseCase } from '@/domain/app/application/use-cases/register-employee'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'

export function makeRegisterEmployeeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()
  return new RegisterEmployeeUseCase(usersRepository, hashProvider)
}
