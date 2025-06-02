import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeAttendant } from 'test/factories/make-attendant'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { GetUserProfile } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfile

describe('Get user profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfile(usersRepository)
  })

  it('should be able to get an user profile', async () => {
    const attendant = makeAttendant()
    usersRepository.create(attendant)

    const result = await sut.execute({
      id: attendant.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: attendant
    })
  })

  it('should not be able to get a non-existing user', async () => {
    const result = await sut.execute({
      id: 'non-existing-user-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
