import { RegisterCookUseCase } from '@/domain/app/application/use-cases/register-cook'
import { PrismaCooksRepository } from '../database/prisma/repositories/prisma-cooks.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'

export function makeRegisterCookUseCase() {
  const cooksRepository = new PrismaCooksRepository()
  const hashProvider = new BCryptHashProvider()
  return new RegisterCookUseCase(cooksRepository, hashProvider)
}
