import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeAttendant } from 'test/factories/make-attendant'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { EditEmployeeUseCase } from './edit-employee'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { Username } from './value-objects/username'

let usersRepository: InMemoryUsersRepository
let hashProvider: FakeHashProvider
let sut: EditEmployeeUseCase

describe('Edit employee', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new FakeHashProvider()
    sut = new EditEmployeeUseCase(usersRepository, hashProvider)
  })

  it('should be able to edit an employee', async () => {
    const attendant = makeAttendant()
    await usersRepository.create(attendant)

    const result = await sut.execute({
      employeeId: attendant.id.toString(),
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
      employee: usersRepository.items[0]
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
    const attendant01 = makeAttendant()
    const attendant02 = makeAttendant()

    await usersRepository.create(attendant01)
    await usersRepository.create(attendant02)

    const result = await sut.execute({
      employeeId: attendant01.id.toString(),
      name: 'New Employee Name',
      username: attendant02.username.value
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })
})
