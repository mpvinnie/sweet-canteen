import { Either, left, right } from '@/core/either'
import { Employee, EmployeeRole } from '../../enterprise/entities/employee'
import { HashProvider } from '../providers/hash.provider'
import { UsersRepository } from '../repositories/users.repository'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

interface RegisterEmployeeUseCaseRequest {
  name: string
  username: string
  password: string
  role: EmployeeRole
}

type RegisterEmployeeUseCaseResponse = Either<
  UsernameAlreadyTakenError | InvalidUsernameError,
  {
    employee: Employee
  }
>

export class RegisterEmployeeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    name,
    username,
    password,
    role
  }: RegisterEmployeeUseCaseRequest): Promise<RegisterEmployeeUseCaseResponse> {
    const existingEmployee = await this.usersRepository.findByUsername(username)

    if (existingEmployee) {
      return left(new UsernameAlreadyTakenError())
    }

    const passwordHash = await this.hashProvider.hash(password)

    const usernameOrError = Username.create(username)

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    const employee = Employee.create({
      name,
      username: usernameOrError.value,
      passwordHash,
      role
    })

    await this.usersRepository.create(employee)

    return right({
      employee
    })
  }
}
