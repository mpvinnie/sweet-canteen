import { makeAdmin } from 'test/factories/make-admin'
import { makeAttendant } from 'test/factories/make-attendant'
import { makeCook } from 'test/factories/make-cook'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { FetchEmployeesUseCase } from './fetch-employees'

let usersRepository: InMemoryUsersRepository
let sut: FetchEmployeesUseCase

describe('Fetch employees', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchEmployeesUseCase(usersRepository)
  })

  it('should be able to fetch filtered employees', async () => {
    const admin = makeAdmin()
    const attendant = makeAttendant({
      name: 'Employee 01'
    })
    const cook01 = makeCook({
      name: 'Employee 02'
    })
    const cook02 = makeCook({
      name: 'Cook'
    })

    await usersRepository.create(admin)
    await usersRepository.create(attendant)
    await usersRepository.create(cook01)
    await usersRepository.create(cook02)

    const result = await sut.execute({
      name: 'Employee',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employees).toHaveLength(2)
    expect(result.value?.employees).toEqual(
      expect.arrayContaining([attendant, cook01])
    )
  })

  it('should be able to fetch paginated users', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create(makeAttendant())
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employees).toHaveLength(2)
  })
})
