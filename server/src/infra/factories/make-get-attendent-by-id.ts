import { GetAttendantByIdUseCase } from '@/domain/app/application/use-cases/get-attendant-by-id'
import { PrismaAttendantsRepository } from '../database/prisma/repositories/prisma-attendants.repository'

export function makeGetAttendantByIdUseCase() {
  const attendantsRepository = new PrismaAttendantsRepository()
  return new GetAttendantByIdUseCase(attendantsRepository)
}
