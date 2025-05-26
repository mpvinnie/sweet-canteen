import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { FetchAttendantsUseCase } from './fetch-attendants'
import { makeAttendant } from 'test/factories/make-attendant'

let attendantsRepository: InMemoryAttendantsRepository
let sut: FetchAttendantsUseCase

describe('Fetch attendants', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    sut = new FetchAttendantsUseCase(attendantsRepository)
  })

  it('should be able to fetch filtered attendants', async () => {
    const attendant01 = makeAttendant({
      name: 'Attendant 01'
    })

    const attendant02 = makeAttendant({
      name: 'Attendant 02'
    })

    await attendantsRepository.create(attendant01)
    await attendantsRepository.create(attendant02)

    const result = await sut.execute({
      name: 'Attendant 02',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.attendants).toHaveLength(1)
    expect(result.value?.attendants[0]).toEqual(attendant02)
  })

  it('should be able to fetch paginated attendants', async () => {
    for (let i = 1; i <= 22; i++) {
      await attendantsRepository.create(makeAttendant())
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.attendants).toHaveLength(2)
  })
})
