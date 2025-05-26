import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { FetchCooksUseCase } from './fetch-cooks'
import { makeCook } from 'test/factories/make-cook'

let cooksRepository: InMemoryCooksRepository
let sut: FetchCooksUseCase

describe('Fetch cooks', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    sut = new FetchCooksUseCase(cooksRepository)
  })

  it('should be able to fetch filtered cooks', async () => {
    const cook01 = makeCook({
      name: 'Cook 01'
    })

    const cook02 = makeCook({
      name: 'Cook 02'
    })

    await cooksRepository.create(cook01)
    await cooksRepository.create(cook02)

    const result = await sut.execute({
      name: 'Cook 02',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.cooks).toHaveLength(1)
    expect(result.value?.cooks[0]).toEqual(cook02)
  })

  it('should be able to fetch paginated cooks', async () => {
    for (let i = 1; i <= 22; i++) {
      await cooksRepository.create(makeCook())
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.cooks).toHaveLength(2)
  })
})
