import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from 'test/factories/make-order'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete order', () => {
  beforeEach(() => {
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    sut = new DeleteOrderUseCase(ordersRepository)
  })

  it('should be able to delete an order', async () => {
    const order = makeOrder()
    ordersRepository.create(order)

    order.orderItems.forEach(orderItem => {
      orderItemsRepository.items.push(orderItem)
    })

    const result = await sut.execute({
      orderId: order.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(ordersRepository.items).toHaveLength(0)
    expect(orderItemsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing order', async () => {
    const result = await sut.execute({
      orderId: 'non-existing-order-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
