import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { makeCook } from 'test/factories/make-cook'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { EditCookUseCase } from './edit-cook'
import { Username } from './value-objects/username'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'

let cooksRepository: InMemoryCooksRepository
let hashProvider: FakeHashProvider
let sut: EditCookUseCase

describe('Edit cook', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    hashProvider = new FakeHashProvider()
    sut = new EditCookUseCase(cooksRepository, hashProvider)
  })

  it('should be able to edit a cook', async () => {
    const cook = makeCook()
    await cooksRepository.create(cook)

    const result = await sut.execute({
      cookId: cook.id.toString(),
      name: 'New Cook Name',
      username: 'new_cook_username',
      password: 'new_password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      cook: expect.objectContaining({
        name: 'New Cook Name',
        username: Username.create('new_cook_username').value,
        passwordHash: 'hashed-new_password'
      })
    })

    expect(result.value).toMatchObject({
      cook: cooksRepository.items[0]
    })
  })

  it('should not be able to edit a non-existing cook', async () => {
    const result = await sut.execute({
      cookId: 'non-existing-cook-id',
      name: 'New Cook Name',
      username: 'new_cook_username',
      password: 'new_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit a cook username to an existing one', async () => {
    const cook01 = makeCook()
    const cook02 = makeCook()

    await cooksRepository.create(cook01)
    await cooksRepository.create(cook02)

    const result = await sut.execute({
      cookId: cook01.id.toString(),
      name: 'New Cook Name',
      username: cook02.username.value,
      password: 'new_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })
})
