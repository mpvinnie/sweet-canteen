import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { AuthenticateUserUseCase } from './authenticate-user'
import { makeAdmin } from 'test/factories/make-admin'
import { Username } from './value-objects/username'
import { unwrapOrFail } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

let usersRepository: InMemoryUsersRepository
let hashProvider: FakeHashProvider
let sut: AuthenticateUserUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    hashProvider = new FakeHashProvider()
    sut = new AuthenticateUserUseCase(usersRepository, hashProvider)
  })

  it('should be able to authenticate an user', async () => {
    const user = makeAdmin({
      username: unwrapOrFail(Username.create('user.username')),
      passwordHash: await hashProvider.hash('password')
    })

    usersRepository.create(user)

    const result = await sut.execute({
      username: 'user.username',
      password: 'password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      payload: expect.objectContaining({
        userId: user.id.toString(),
        role: user.role
      })
    })
  })

  it('should not be able to authenticate an user with invalid username', async () => {
    const result = await sut.execute({
      username: 'non.existent.user.username',
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an user with wrong password', async () => {
    const user = makeAdmin({
      username: unwrapOrFail(Username.create('user.username')),
      passwordHash: await hashProvider.hash('password')
    })

    usersRepository.create(user)

    const result = await sut.execute({
      username: 'user.username',
      password: 'wrong_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
