import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Employee, EmployeeRole } from '../../enterprise/entities/employee'
import { HashProvider } from '../providers/hash.provider'
import { EmployeesRepository } from '../repositories/employees.repository'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

interface EditEmployeeUseCaseRequest {
  employeeId: string
  name?: string
  role?: EmployeeRole
  username?: string
  password?: string
}

type EditEmployeeUseCaseResponse = Either<
  ResourceNotFoundError | InvalidUsernameError | UsernameAlreadyTakenError,
  {
    employee: Employee
  }
>

export class EditEmployeeUseCase {
  constructor(
    private employeesRepository: EmployeesRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    employeeId,
    name,
    role,
    username,
    password
  }: EditEmployeeUseCaseRequest): Promise<EditEmployeeUseCaseResponse> {
    const employee = await this.employeesRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    if (username) {
      const newUsername = Username.create(username)

      if (newUsername.isLeft()) {
        return left(newUsername.value)
      }

      const existingEmployee =
        await this.employeesRepository.findByUsername(username)

      if (existingEmployee) {
        return left(new UsernameAlreadyTakenError())
      }

      employee.username = newUsername.value
    }

    if (password) {
      const passwordHash = await this.hashProvider.hash(password)

      employee.passwordHash = passwordHash
    }

    employee.name = name ?? employee.name
    employee.updateRole(role ?? employee.role)

    await this.employeesRepository.save(employee)

    return right({
      employee
    })
  }
}
