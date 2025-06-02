import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Role } from '@/core/types/role'
import { User } from '../../enterprise/entities/user'
import { HashProvider } from '../providers/hash.provider'
import { UsersRepository } from '../repositories/users.repository'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

interface EditEmployeeUseCaseRequest {
  employeeId: string
  name?: string
  role?: Role
  username?: string
  password?: string
}

type EditEmployeeUseCaseResponse = Either<
  ResourceNotFoundError | InvalidUsernameError | UsernameAlreadyTakenError,
  {
    employee: User
  }
>

export class EditEmployeeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    employeeId,
    name,
    role,
    username,
    password
  }: EditEmployeeUseCaseRequest): Promise<EditEmployeeUseCaseResponse> {
    const employee = await this.usersRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    if (username) {
      const newUsername = Username.create(username)

      if (newUsername.isLeft()) {
        return left(newUsername.value)
      }

      const existingEmployee =
        await this.usersRepository.findByUsername(username)

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
    employee.role = role ?? employee.role

    await this.usersRepository.save(employee)

    return right({
      employee
    })
  }
}
