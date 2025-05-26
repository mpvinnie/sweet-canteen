import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { GetAttendantByUsernameUseCase } from './get-attendant-by-username'
import { makeAttendant } from 'test/factories/make-attendant'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let attendantsRepository: InMemoryAttendantsRepository
let sut: GetAttendantByUsernameUseCase

describe('Get attendant by username', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    sut = new GetAttendantByUsernameUseCase(attendantsRepository)
  })

  it('should be able to get an attendant by his username', async () => {
    const attendant = makeAttendant()
    attendantsRepository.create(attendant)

    const result = await sut.execute({
      username: attendant.username.value
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      attendant
    })
  })

  it('should not be able to get a non-existing attendant', async () => {
    const result = await sut.execute({
      username: 'non-existing-attendant-username'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
