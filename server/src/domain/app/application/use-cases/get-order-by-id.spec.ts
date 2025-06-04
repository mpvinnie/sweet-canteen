import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { GetOrderByIdUseCase } from './get-order-by-id'

let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let sut: GetOrderByIdUseCase

describe('Get order by id', () => {
  beforeEach(() => {
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    sut = new GetOrderByIdUseCase(ordersRepository)
  })

  it('should be able to get an onder by id', async () => {
    const order = makeOrder()
    await ordersRepository.create(order)

    const result = await sut.execute({
      orderId: order.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      order: ordersRepository.items[0]
    })
  })

  it('should not be able to get a non-existent onder', async () => {
    const order = makeOrder()
    await ordersRepository.create(order)

    const result = await sut.execute({
      orderId: 'non-existing-order-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
