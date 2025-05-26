import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { DeleteAttendantUseCase } from './delete-attendant'
import { makeAttendant } from 'test/factories/make-attendant'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let attendantsRepository: InMemoryAttendantsRepository
let sut: DeleteAttendantUseCase

describe('Delete attendant', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    sut = new DeleteAttendantUseCase(attendantsRepository)
  })

  it('should be able to delete an attendant', async () => {
    const attendant = makeAttendant()
    await attendantsRepository.create(attendant)

    const result = await sut.execute({
      attendantId: attendant.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(attendantsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing attendant', async () => {
    const attendant = makeAttendant()
    await attendantsRepository.create(attendant)

    const result = await sut.execute({
      attendantId: 'non-existing-attendant-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(attendantsRepository.items).toHaveLength(1)
  })
})
