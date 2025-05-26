import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { makeOrder } from 'test/factories/make-order'
import { FetchOrdersUseCase } from './fetch-orders'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrdersUseCase

describe('Fetch orders', () => {
  beforeEach(() => {
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    sut = new FetchOrdersUseCase(ordersRepository)
  })

  it('should be fetch filtered orders', async () => {
    const order01 = makeOrder({
      attendantId: new UniqueEntityID('attendant-01'),
      customerName: 'Customer Name 01'
    })

    const order02 = makeOrder({
      attendantId: new UniqueEntityID('attendant-01'),
      customerName: 'Customer Name 02'
    })

    const order03 = makeOrder({
      attendantId: new UniqueEntityID('attendant-02'),
      customerName: 'Customer Name 01'
    })

    ordersRepository.create(order01)
    ordersRepository.create(order02)
    ordersRepository.create(order03)

    const result = await sut.execute({
      attendantId: 'attendant-01',
      customerName: 'Customer Name 01',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toHaveLength(1)
    expect(result.value).toMatchObject({
      orders: expect.arrayContaining([expect.objectContaining(order01)])
    })
  })

  it('should be fetch paginated orders', async () => {
    for (let i = 1; i <= 22; i++) {
      await ordersRepository.create(makeOrder())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toHaveLength(2)
  })
})
