import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { RegisterAttendantUseCase } from './register-attendant'
import { makeAttendant } from 'test/factories/make-attendant'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'

let attendantsRepository: InMemoryAttendantsRepository
let hashProvider: FakeHashProvider
let sut: RegisterAttendantUseCase

describe('Register attendant', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    hashProvider = new FakeHashProvider()
    sut = new RegisterAttendantUseCase(attendantsRepository, hashProvider)
  })

  it('should be able to register an attendant and hash his password', async () => {
    const result = await sut.execute({
      name: 'Attendant Name',
      username: 'attendant_username',
      password: 'password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      attendant: expect.objectContaining({
        passwordHash: 'hashed-password'
      })
    })
    expect(result.value).toMatchObject({
      attendant: attendantsRepository.items[0]
    })
  })

  it('should not be able to register an attendant with same username from another one', async () => {
    const attendant = makeAttendant()
    attendantsRepository.create(attendant)

    const result = await sut.execute({
      name: 'Attendant Name',
      username: attendant.username.value,
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })

  it('should not be able to register an attendant with an invalid username', async () => {
    const result = await sut.execute({
      name: 'Attendant Name',
      username: 'invalid username',
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidUsernameError)
  })
})
