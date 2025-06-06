import { InMemoryOnlineUsersRepository } from 'test/repositories/in-memory-online-users.repository'
import { ConnectUserUseCase } from './connect-user'

let onlineUsersRepository: InMemoryOnlineUsersRepository
let sut: ConnectUserUseCase

describe('Connect cook', () => {
  beforeEach(() => {
    onlineUsersRepository = new InMemoryOnlineUsersRepository()
    sut = new ConnectUserUseCase(onlineUsersRepository)
  })

  it('should be able to connect a cook when logged', async () => {
    const result = await sut.execute({
      userId: 'cook-id',
      socketId: 'socket-id',
      role: 'cook'
    })

    expect(result.isRight()).toBe(true)
    expect(onlineUsersRepository.onlineUsers.size).toBe(1)
  })
})
