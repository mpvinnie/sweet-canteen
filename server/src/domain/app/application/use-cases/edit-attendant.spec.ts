import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { makeAttendant } from 'test/factories/make-attendant'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { EditAttendantUseCase } from './edit-attendant'
import { Username } from './value-objects/username'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { FakeHashProvider } from 'test/providers/fake-hash.provider'

let attendantsRepository: InMemoryAttendantsRepository
let hashProvider: FakeHashProvider
let sut: EditAttendantUseCase

describe('Edit attendant', () => {
  beforeEach(() => {
    attendantsRepository = new InMemoryAttendantsRepository()
    hashProvider = new FakeHashProvider()
    sut = new EditAttendantUseCase(attendantsRepository, hashProvider)
  })

  it('should be able to edit an attendant', async () => {
    const attendant = makeAttendant()
    await attendantsRepository.create(attendant)

    const result = await sut.execute({
      attendantId: attendant.id.toString(),
      name: 'New Attendant Name',
      username: 'new_attendant_username',
      password: 'new_password'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      attendant: expect.objectContaining({
        name: 'New Attendant Name',
        username: Username.create('new_attendant_username').value,
        passwordHash: 'hashed-new_password'
      })
    })

    expect(result.value).toMatchObject({
      attendant: attendantsRepository.items[0]
    })
  })

  it('should not be able to edit a non-existing attendant', async () => {
    const result = await sut.execute({
      attendantId: 'non-existing-attendant-id',
      name: 'New Attendant Name',
      username: 'new_attendant_username',
      password: 'new_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit an attendant username to an existing one', async () => {
    const attendant01 = makeAttendant()
    const attendant02 = makeAttendant()

    await attendantsRepository.create(attendant01)
    await attendantsRepository.create(attendant02)

    const result = await sut.execute({
      attendantId: attendant01.id.toString(),
      name: 'New Attendant Name',
      username: attendant02.username.value,
      password: 'new_password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UsernameAlreadyTakenError)
  })
})
