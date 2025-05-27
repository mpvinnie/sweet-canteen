import { RegisterAttendantUseCase } from '@/domain/app/application/use-cases/register-attendant'
import { PrismaAttendantsRepository } from '../database/prisma/repositories/prisma-attendants.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'

export function makeRegisterAttendantUseCase() {
  const attendantsRepository = new PrismaAttendantsRepository()
  const hashProvider = new BCryptHashProvider()
  return new RegisterAttendantUseCase(attendantsRepository, hashProvider)
}
