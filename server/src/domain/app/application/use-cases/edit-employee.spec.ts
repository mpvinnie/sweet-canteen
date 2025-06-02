import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeEmployee } from 'test/factories/make-employee'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees.repository'
import { EditEmployeeUseCase } from './edit-employee'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

let employeesRepository: InMemoryEmployeesRepository
let hashProvider: FakeHashProvider
let sut: EditEmployeeUseCase

describe('Edit employee', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    hashProvider = new FakeHashProvider()
    sut = new EditEmployeeUseCase(employeesRepository, hashProvider)
  })

  it('should be able to edit an employee', async () => {
    const employee = makeEmployee()
    employeesRepository.items.push(employee)

    const result = await sut.execute({
      employeeId: employee.id.toString(),
      name: 'New Employee Name',
      role: 'cook',
      username: 'cook_username',
      password: 'new_password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      employee: expect.objectContaining({
        name: 'New Employee Name',
        username: Username.create('cook_username').value,
        passwordHash: 'hashed-new_password'
      })
    })

    expect(result.value).toMatchObject({
      employee: employeesRepository.items[0]
    })
  })

  it('should not be able to edit a non-existing employee', async () => {
    const result = await sut.execute({
      employeeId: 'non-existing-employee-id',
      name: 'New Employee Name',
      username: 'new_attendant_username',
      password: 'new_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit an employee username to an existing one', async () => {
    const employee01 = makeEmployee()
    const employee02 = makeEmployee()

    employeesRepository.items.push(employee01)
    employeesRepository.items.push(employee02)

    const result = await sut.execute({
      employeeId: employee01.id.toString(),
      name: 'New Employee Name',
      username: employee02.username.value
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })
})
