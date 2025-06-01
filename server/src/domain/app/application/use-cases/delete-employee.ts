import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UsersRepository } from '../repositories/users.repository'

interface DeleteEmployeeUseCaseRequest {
  employeeId: string
}

type DeleteEmployeeUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteEmployeeUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    employeeId
  }: DeleteEmployeeUseCaseRequest): Promise<DeleteEmployeeUseCaseResponse> {
    const employee = await this.usersRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(employee)

    return right(null)
  }
}
