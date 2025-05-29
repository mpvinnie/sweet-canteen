import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'
import { PrismaAttendantsRepository } from '../database/prisma/repositories/prisma-attendants.repository'
import { AuthenticateAttendantUseCase } from '@/domain/app/application/use-cases/authenticate-attendant'

export function makeAuthenticateAttendantUseCase() {
  const attendantsRepository = new PrismaAttendantsRepository()
  const hashProvider = new BCryptHashProvider()
  return new AuthenticateAttendantUseCase(attendantsRepository, hashProvider)
}
