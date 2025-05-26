import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { FetchTodayOrdersUseCase } from './fetch-today-orders'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { makeOrder } from 'test/factories/make-order'
import { vi } from 'vitest'
import { FakeDateProvider } from 'test/providers/fake-date.provider'

let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let dateProvider: FakeDateProvider
let sut: FetchTodayOrdersUseCase

describe('Fetch today orders', () => {
  beforeEach(() => {
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    dateProvider = new FakeDateProvider()
    sut = new FetchTodayOrdersUseCase(ordersRepository, dateProvider)
  })

  it('should be able to fetch today`s orders', async () => {
    const dateNowSpy = vi.spyOn(dateProvider, 'dateNow')
    dateNowSpy.mockReturnValue(new Date('2025-05-17'))

    const order01 = makeOrder({
      createdAt: new Date('2025-05-16')
    })

    const order02 = makeOrder({
      createdAt: new Date('2025-05-17')
    })

    ordersRepository.create(order01)
    ordersRepository.create(order02)

    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toEqual([order02])
  })

  it('should be able to fetch filtered today`s orders', async () => {
    const dateNowSpy = vi.spyOn(dateProvider, 'dateNow')
    dateNowSpy.mockReturnValue(new Date('2025-05-18'))

    const order01 = makeOrder({
      createdAt: new Date('2025-05-17'),
      status: 'completed'
    })

    const order02 = makeOrder({
      createdAt: new Date('2025-05-18'),
      status: 'processing'
    })

    const order03 = makeOrder({
      createdAt: new Date('2025-05-18'),
      status: 'finished'
    })

    const order04 = makeOrder({
      createdAt: new Date('2025-05-18'),
      status: 'completed'
    })

    ordersRepository.create(order01)
    ordersRepository.create(order02)
    ordersRepository.create(order03)
    ordersRepository.create(order04)

    const result = await sut.execute({
      status: 'completed',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toEqual([order04])
  })
})
