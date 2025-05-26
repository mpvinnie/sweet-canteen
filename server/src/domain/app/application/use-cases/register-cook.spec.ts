import { InMemoryCooksRepository } from 'test/repositories/in-memory-cooks.repository'
import { RegisterCookUseCase } from './register-cook'
import { makeCook } from 'test/factories/make-cook'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'

let cooksRepository: InMemoryCooksRepository
let hashProvider: FakeHashProvider
let sut: RegisterCookUseCase

describe('Register cook', () => {
  beforeEach(() => {
    cooksRepository = new InMemoryCooksRepository()
    hashProvider = new FakeHashProvider()
    sut = new RegisterCookUseCase(cooksRepository, hashProvider)
  })

  it('should be able to register an cook and hash his password', async () => {
    const result = await sut.execute({
      name: 'Cook Name',
      username: 'cook_username',
      password: 'password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      cook: expect.objectContaining({
        passwordHash: 'hashed-password'
      })
    })
    expect(result.value).toMatchObject({
      cook: cooksRepository.items[0]
    })
  })

  it('should not be able to register a cook with same username from another one', async () => {
    const cook = makeCook()
    cooksRepository.create(cook)

    const result = await sut.execute({
      name: 'Cook Name',
      username: cook.username.value,
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })

  it('should not be able to register an cook with an invalid username', async () => {
    const result = await sut.execute({
      name: 'Cook Name',
      username: 'invalid username',
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidUsernameError)
  })
})
