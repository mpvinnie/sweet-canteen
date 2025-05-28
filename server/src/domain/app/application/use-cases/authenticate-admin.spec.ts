import { FakeHashProvider } from 'test/providers/fake-hash.provider'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins.repository'
import { AuthenticateAdminUseCase } from './authenticate-admin'
import { makeAdmin } from 'test/factories/make-admin'
import { Username } from './value-objects/username'
import { unwrapOrFail } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

let adminsRepository: InMemoryAdminsRepository
let hashProvider: FakeHashProvider
let sut: AuthenticateAdminUseCase

describe('Authenticate admin', () => {
  beforeEach(() => {
    adminsRepository = new InMemoryAdminsRepository()
    hashProvider = new FakeHashProvider()
    sut = new AuthenticateAdminUseCase(adminsRepository, hashProvider)
  })

  it('should be able to authenticate an admin', async () => {
    const admin = makeAdmin({
      username: unwrapOrFail(Username.create('admin.username')),
      passwordHash: await hashProvider.hash('password')
    })

    adminsRepository.create(admin)

    const result = await sut.execute({
      username: 'admin.username',
      password: 'password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      payload: expect.objectContaining({
        userId: admin.id.toString(),
        role: admin.role
      })
    })
  })

  it('should not be able to authenticate an admin with invalid username', async () => {
    const result = await sut.execute({
      username: 'non.existent.admin.username',
      password: 'password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an admin with wrong password', async () => {
    const admin = makeAdmin({
      username: unwrapOrFail(Username.create('admin.username')),
      passwordHash: await hashProvider.hash('password')
    })

    adminsRepository.create(admin)

    const result = await sut.execute({
      username: 'admin.username',
      password: 'wrong_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
