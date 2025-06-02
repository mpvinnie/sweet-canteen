import { EditEmployeeUseCase } from '@/domain/app/application/use-cases/edit-employee'
import { PrismaEmployeesRepository } from '../database/prisma/repositories/prisma-employees.repository'
import { BCryptHashProvider } from '../providers/bcrypt-hash.provider'

export function makeEditEmployeeUseCase() {
  const employeesRepository = new PrismaEmployeesRepository()
  const hashProvider = new BCryptHashProvider()
  return new EditEmployeeUseCase(employeesRepository, hashProvider)
}
