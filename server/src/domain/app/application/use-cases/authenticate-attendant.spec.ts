import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { AuthenticateAttendantUseCase } from './authenticate-attendant'
import { makeAttendant } from 'test/factories/make-attendant'
import { Username } from './value-objects/username'
import { unwrapOrFail } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

let attendantsRepository: InMemoryAttendantsRepository
let hashProvider: FakeHashProvider
let sut: AuthenticateAttendantUseCase

describe('Authenticate attendant', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    hashProvider = new FakeHashProvider()
    sut = new AuthenticateAttendantUseCase(attendantsRepository, hashProvider)
  })

  it('should be able to authenticate an attendant', async () => {
    const attendant = makeAttendant({
      username: unwrapOrFail(Username.create('attendant.username')),
      passwordHash: await hashProvider.hash('password')
    })

    attendantsRepository.create(attendant)

    const result = await sut.execute({
      username: 'attendant.username',
      password: 'password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      payload: expect.objectContaining({
        userId: attendant.id.toString(),
        role: attendant.role
      })
    })
  })

  it('should not be able to authenticate an attendant with invalid username', async () => {
    const result = await sut.execute({
      username: 'non.existent.attendant.username',
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an attendant with wrong password', async () => {
    const attendant = makeAttendant({
      username: unwrapOrFail(Username.create('attendant.username')),
      passwordHash: await hashProvider.hash('password')
    })

    attendantsRepository.create(attendant)

    const result = await sut.execute({
      username: 'attendant.username',
      password: 'wrong_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
