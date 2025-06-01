import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeAttendant } from 'test/factories/make-attendant'
import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { GetAttendantByIdUseCase } from './get-attendant-by-id'

let attendantsRepository: InMemoryAttendantsRepository
let sut: GetAttendantByIdUseCase

describe('Get attendant by id', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    sut = new GetAttendantByIdUseCase(attendantsRepository)
  })

  it('should be able to get an attendant by his id', async () => {
    const attendant = makeAttendant()
    attendantsRepository.create(attendant)

    const result = await sut.execute({
      id: attendant.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      attendant
    })
  })

  it('should not be able to get a non-existing attendant', async () => {
    const result = await sut.execute({
      id: 'non-existing-attendant-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
