import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { ChangeOrderStatusUseCase } from './change-order-status'
import { makeOrder } from 'test/factories/make-order'
import { InvalidStatusTransition } from './errors/invalid-status-transition.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let sut: ChangeOrderStatusUseCase

describe('Change order status', () => {
  beforeEach(() => {
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    sut = new ChangeOrderStatusUseCase(ordersRepository)
  })

  it('should be able to change the status of an order', async () => {
    const order = makeOrder()
    ordersRepository.create(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      newStatus: 'processing'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      order: expect.objectContaining({
        status: 'processing'
      })
    })
  })

  it('should not be able to change the status of a non-existing order', async () => {
    const result = await sut.execute({
      orderId: 'non-existing-order-id',
      newStatus: 'processing'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be not able to change the order status if its not a valid transition', async () => {
    const pendingOrder = makeOrder()
    const processingOrder = makeOrder({
      status: 'processing'
    })
    const finishedOrder = makeOrder({
      status: 'finished'
    })

    ordersRepository.create(pendingOrder)
    ordersRepository.create(processingOrder)
    ordersRepository.create(finishedOrder)

    const pendingResult = await sut.execute({
      orderId: pendingOrder.id.toString(),
      newStatus: 'finished'
    })

    expect(pendingResult.isLeft()).toBe(true)
    expect(pendingResult.value).toBeInstanceOf(InvalidStatusTransition)

    const processingResult = await sut.execute({
      orderId: processingOrder.id.toString(),
      newStatus: 'pending'
    })

    expect(processingResult.isLeft()).toBe(true)
    expect(processingResult.value).toBeInstanceOf(InvalidStatusTransition)

    const finishedResult = await sut.execute({
      orderId: finishedOrder.id.toString(),
      newStatus: 'on_hold'
    })

    expect(finishedResult.isLeft()).toBe(true)
    expect(finishedResult.value).toBeInstanceOf(InvalidStatusTransition)
  })
})
