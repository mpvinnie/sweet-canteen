import { makeCook } from 'test/factories/make-cook'
import { ConnectUserUseCase } from './connect-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { InMemoryOnlineUsersRepository } from 'test/repositories/in-memory-online-users.repository'

let usersRepository: InMemoryUsersRepository
let onlineUsersRepository: InMemoryOnlineUsersRepository
let sut: ConnectUserUseCase

describe('Connect cook', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    onlineUsersRepository = new InMemoryOnlineUsersRepository()
    sut = new ConnectUserUseCase(usersRepository, onlineUsersRepository)
  })

  it('should be able to connect a cook when logged', async () => {
    const cook = makeCook()
    await usersRepository.create(cook)

    const result = await sut.execute({
      userId: cook.id.toString(),
      socketId: 'socket-id'
    })

    expect(result.isRight()).toBe(true)
    expect(onlineUsersRepository.onlineUsers.size).toBe(1)
  })
})
