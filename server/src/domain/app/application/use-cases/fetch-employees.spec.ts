import { makeEmployee } from 'test/factories/make-employee'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees.repository'
import { FetchEmployeesUseCase } from './fetch-employees'

let employeesRepository: InMemoryEmployeesRepository
let sut: FetchEmployeesUseCase

describe('Fetch employees', () => {
  beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new FetchEmployeesUseCase(employeesRepository)
  })

  it('should be able to fetch filtered employees', async () => {
    const attendant = makeEmployee({
      name: 'Employee 01',
      role: 'attendant'
    })
    const cook01 = makeEmployee({
      name: 'Employee 02',
      role: 'cook'
    })
    const cook02 = makeEmployee({
      name: 'Cook',
      role: 'cook'
    })

    employeesRepository.items.push(attendant)
    employeesRepository.items.push(cook01)
    employeesRepository.items.push(cook02)

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

  it('should be able to fetch paginated employees', async () => {
    for (let i = 1; i <= 22; i++) {
      employeesRepository.items.push(makeEmployee())
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employees).toHaveLength(2)
  })
})
