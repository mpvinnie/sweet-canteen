import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { GetCookByUsernameUseCase } from './get-cook-by-username'
import { makeCook } from 'test/factories/make-cook'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let cooksRepository: InMemoryCooksRepository
let sut: GetCookByUsernameUseCase

describe('Get cook by username', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    sut = new GetCookByUsernameUseCase(cooksRepository)
  })

  it('should be able to get a cook by his username', async () => {
    const cook = makeCook()
    cooksRepository.create(cook)

    const result = await sut.execute({
      username: cook.username.value
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      cook
    })
  })

  it('should not be able to get a non-existing cook', async () => {
    const result = await sut.execute({
      username: 'non-existing-cook-username'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
