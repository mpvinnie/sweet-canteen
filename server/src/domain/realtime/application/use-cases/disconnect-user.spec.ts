import { makeOnlineUser } from 'test/factories/make-online-user'
import { InMemoryOnlineUsersRepository } from 'test/repositories/in-memory-online-users.repository'
import { DisconnectUserUseCase } from './disconnect-user'

let onlineUsersRepository: InMemoryOnlineUsersRepository
let sut: DisconnectUserUseCase

describe('Disconnect user', () => {
  beforeEach(() => {
    onlineUsersRepository = new InMemoryOnlineUsersRepository()
    sut = new DisconnectUserUseCase(onlineUsersRepository)
  })

  it('should be able to disconnect a user when dislogged', async () => {
    const onlineUser = makeOnlineUser()
    await onlineUsersRepository.add(onlineUser)

    const result = await sut.execute({
      socketId: onlineUser.socketId
    })

    expect(result.isRight()).toBe(true)
    expect(onlineUsersRepository.onlineUsers.size).toBe(0)
  })
})
