import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { DeleteCookUseCase } from './delete-cook'
import { makeCook } from 'test/factories/make-cook'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let cooksRepository: InMemoryCooksRepository
let sut: DeleteCookUseCase

describe('Delete cook', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    sut = new DeleteCookUseCase(cooksRepository)
  })

  it('should be able to delete a cook', async () => {
    const cook = makeCook()
    await cooksRepository.create(cook)

    const result = await sut.execute({
      cookId: cook.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(cooksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing cook', async () => {
    const cook = makeCook()
    await cooksRepository.create(cook)

    const result = await sut.execute({
      cookId: 'non-existing-cook-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(cooksRepository.items).toHaveLength(1)
  })
})
