import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'
import { AuthenticateUserUseCase } from '@/domain/app/application/use-cases/authenticate-user'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()
  return new AuthenticateUserUseCase(usersRepository, hashProvider)
}
