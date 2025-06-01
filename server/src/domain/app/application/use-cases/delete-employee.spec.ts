import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeAttendant } from 'test/factories/make-attendant'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { DeleteEmployeeUseCase } from './delete-employee'

let usersRepository: InMemoryUsersRepository
let sut: DeleteEmployeeUseCase

describe('Delete employee', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteEmployeeUseCase(usersRepository)
  })

  it('should be able to delete an employee', async () => {
    const attendant = makeAttendant()
    await usersRepository.create(attendant)

    const result = await sut.execute({
      employeeId: attendant.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(usersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing employee', async () => {
    const attendant = makeAttendant()
    await usersRepository.create(attendant)

    const result = await sut.execute({
      employeeId: 'non-existing-employee-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(usersRepository.items).toHaveLength(1)
  })
})
