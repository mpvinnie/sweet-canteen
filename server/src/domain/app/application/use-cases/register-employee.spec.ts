import { makeEmployee } from 'test/factories/make-employee'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { RegisterEmployeeUseCase } from './register-employee'

let usersRepository: InMemoryUsersRepository
let hashProvider: FakeHashProvider
let sut: RegisterEmployeeUseCase

describe('Register employee', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new FakeHashProvider()
    sut = new RegisterEmployeeUseCase(usersRepository, hashProvider)
  })

  it('should be able to register an employee and hash his password', async () => {
    const result = await sut.execute({
      name: 'Employee Name',
      username: 'employee_username',
      password: 'password',
      role: 'attendant'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      employee: expect.objectContaining({
        passwordHash: 'hashed-password'
      })
    })
    expect(result.value).toMatchObject({
      employee: usersRepository.items[0]
    })
  })

  it('should not be able to register an employee with same username from another one', async () => {
    const employee = makeEmployee()
    usersRepository.create(employee)

    const result = await sut.execute({
      name: 'Employee Name',
      username: employee.username.value,
      password: 'password',
      role: 'attendant'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })

  it('should not be able to register an employee with an invalid username', async () => {
    const result = await sut.execute({
      name: 'Employee Name',
      username: 'invalid username',
      password: 'password',
      role: 'cook'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidUsernameError)
  })
})
