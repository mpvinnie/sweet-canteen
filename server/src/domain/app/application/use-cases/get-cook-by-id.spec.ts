import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeCook } from 'test/factories/make-cook'
import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { GetCookByIdUseCase } from './get-cook-by-id'

let cooksRepository: InMemoryCooksRepository
let sut: GetCookByIdUseCase

describe('Get cook by id', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    sut = new GetCookByIdUseCase(cooksRepository)
  })

  it('should be able to get a cook by his id', async () => {
    const cook = makeCook()
    cooksRepository.create(cook)

    const result = await sut.execute({
      id: cook.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      cook
    })
  })

  it('should not be able to get a non-existing cook', async () => {
    const result = await sut.execute({
      id: 'non-existing-cook-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
