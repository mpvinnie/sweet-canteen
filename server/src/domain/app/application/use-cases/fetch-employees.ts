import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'

interface FetchEmployeesUseCaseRequest {
  name?: string
  page: number
}

type FetchEmployeesUseCaseResponse = Either<
  null,
  {
    employees: User[]
  }
>

export class FetchEmployeesUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    page
  }: FetchEmployeesUseCaseRequest): Promise<FetchEmployeesUseCaseResponse> {
    const employees = await this.usersRepository.findManyEmployees(
      { name },
      { page }
    )

    return right({ employees })
  }
}
