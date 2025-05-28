import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'
import { PrismaAdminsRepository } from '../database/prisma/repositories/prisma-admins.repository'
import { AuthenticateAdminUseCase } from '@/domain/app/application/use-cases/authenticate-admin'

export function makeAuthenticateAdminUseCase() {
  const adminsRepository = new PrismaAdminsRepository()
  const hashProvider = new BCryptHashProvider()
  return new AuthenticateAdminUseCase(adminsRepository, hashProvider)
}
