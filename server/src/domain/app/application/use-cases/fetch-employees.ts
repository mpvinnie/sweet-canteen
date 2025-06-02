import { Either, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeesRepository } from '../repositories/employees.repository'

interface FetchEmployeesUseCaseRequest {
  name?: string
  page: number
}

type FetchEmployeesUseCaseResponse = Either<
  null,
  {
    employees: Employee[]
  }
>

export class FetchEmployeesUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    page
  }: FetchEmployeesUseCaseRequest): Promise<FetchEmployeesUseCaseResponse> {
    const employees = await this.employeesRepository.findMany(
      { name },
      { page }
    )

    return right({ employees })
  }
}
