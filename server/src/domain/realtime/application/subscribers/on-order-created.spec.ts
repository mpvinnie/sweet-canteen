import { OnOrderCreated } from './on-order-created'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryOnlineUsersRepository } from 'test/repositories/in-memory-online-users.repository'
import { FakeSocketProvider } from 'test/providers/fake-socket.provider'
import { makeAttendant } from 'test/factories/make-attendant'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { MockInstance } from 'vitest'
import { makeOnlineUser } from 'test/factories/make-online-user'
import { makeCook } from 'test/factories/make-cook'

let onlineUsersRepository: InMemoryOnlineUsersRepository
let socketProvider: FakeSocketProvider
let attendantsRepository: InMemoryAttendantsRepository
let usersRepository: InMemoryUsersRepository
let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository

let emitNewOrderEmitToSpy: MockInstance<(typeof socketProvider)['emitTo']>

describe('On order created', () => {
  beforeEach(() => {
    onlineUsersRepository = new InMemoryOnlineUsersRepository()
    socketProvider = new FakeSocketProvider()

    attendantsRepository = new InMemoryAttendantsRepository()
    usersRepository = new InMemoryUsersRepository()
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)

    emitNewOrderEmitToSpy = vi.spyOn(socketProvider, 'emitTo')

    new OnOrderCreated(onlineUsersRepository, socketProvider)
  })

  it('should emit a socket event when an order is created', async () => {
    const attendant = makeAttendant()
    const cook = makeCook()
    const order = makeOrder({
      attendantId: attendant.id
    })
    const onlineUser = makeOnlineUser({
      userId: cook.id
    })

    await attendantsRepository.create(attendant)
    await usersRepository.create(cook)
    await onlineUsersRepository.add(onlineUser)
    await ordersRepository.create(order)

    await waitFor(() => {
      expect(emitNewOrderEmitToSpy).toHaveBeenCalled()
      expect(onlineUsersRepository.onlineUsers.size).toBe(1)
      expect(socketProvider.emitted).toHaveLength(1)
    })
  })
})
