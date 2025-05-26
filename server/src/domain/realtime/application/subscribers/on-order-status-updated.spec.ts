import { waitFor } from 'test/utils/wait-for'
import { InMemoryOnlineUsersRepository } from 'test/repositories/in-memory-online-users.repository'
import { FakeSocketProvider } from 'test/providers/fake-socket.provider'
import { makeAttendant } from 'test/factories/make-attendant'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { MockInstance } from 'vitest'
import { makeOnlineUser } from 'test/factories/make-online-user'
import { makeCook } from 'test/factories/make-cook'
import { OnOrderStatusUpdated } from './on-order-status-updated'

let onlineUsersRepository: InMemoryOnlineUsersRepository
let socketProvider: FakeSocketProvider
let usersRepository: InMemoryUsersRepository
let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository

let emitOrderStatusUpdatedEmitToSpy: MockInstance<
  (typeof socketProvider)['emitTo']
>

describe('On order status updated', () => {
  beforeEach(() => {
    onlineUsersRepository = new InMemoryOnlineUsersRepository()
    socketProvider = new FakeSocketProvider()

    usersRepository = new InMemoryUsersRepository()
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)

    emitOrderStatusUpdatedEmitToSpy = vi.spyOn(socketProvider, 'emitTo')

    new OnOrderStatusUpdated(onlineUsersRepository, socketProvider)
  })

  it('should emit a socket event when an order status is updated', async () => {
    const attendant = makeAttendant()
    const offlineCook = makeCook()
    const cook = makeCook()
    const order = makeOrder({
      attendantId: attendant.id
    })

    await usersRepository.create(attendant)
    await usersRepository.create(offlineCook)
    await usersRepository.create(cook)

    const onlineUser01 = makeOnlineUser({
      userId: attendant.id
    })
    const onlineUser02 = makeOnlineUser({
      userId: cook.id
    })

    await onlineUsersRepository.add(onlineUser01)
    await onlineUsersRepository.add(onlineUser02)
    await ordersRepository.create(order)

    order.status = 'processing'

    await ordersRepository.save(order)

    await waitFor(() => {
      expect(emitOrderStatusUpdatedEmitToSpy).toHaveBeenCalled()
      expect(onlineUsersRepository.onlineUsers.size).toBe(2)
      expect(socketProvider.emitted).toHaveLength(2)
    })
  })
})
