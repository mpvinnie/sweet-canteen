import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeAttendant } from 'test/factories/make-attendant'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryAttendantsRepository } from 'test/repositories/in-memory-attendants.repository'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryOrderItemsRepository } from 'test/repositories/in-memory-orderItems.repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { InsufficientStockError } from './errors/insufficient-stock.error'
import { UnavailableProductError } from './errors/unavailable-product.error'
import { RegisterOrderUseCase } from './register-order'

let attendatsRepository: InMemoryAttendantsRepository
let categoriesRepository: InMemoryCategoriesRepository
let productsRepository: InMemoryProductsRepository
let orderItemsRepository: InMemoryOrderItemsRepository
let ordersRepository: InMemoryOrdersRepository
let sut: RegisterOrderUseCase

describe('Register order', () => {
  beforeEach(() => {
    attendatsRepository = new InMemoryAttendantsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    orderItemsRepository = new InMemoryOrderItemsRepository()
    ordersRepository = new InMemoryOrdersRepository(orderItemsRepository)
    sut = new RegisterOrderUseCase(
      attendatsRepository,
      productsRepository,
      ordersRepository
    )
  })

  it('should be able to register an order', async () => {
    const attendant = makeAttendant()
    attendatsRepository.items.push(attendant)

    const product01 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 5,
      available: true
    })
    const product02 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 3,
      available: true
    })
    productsRepository.create(product01)
    productsRepository.create(product02)

    const result = await sut.execute({
      attendantId: attendant.id.toString(),
      customerName: 'Customer Name',
      items: [
        {
          productId: product01.id.toString(),
          quantity: 2
        },
        {
          productId: product02.id.toString(),
          quantity: 1
        }
      ]
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      order: ordersRepository.items[0]
    })
    expect(ordersRepository.items[0].orderItems).toHaveLength(2)
    expect(ordersRepository.items[0].orderItems).toEqual([
      expect.objectContaining({ productId: product01.id }),
      expect.objectContaining({ productId: product02.id })
    ])
    expect(productsRepository.items[0].availableQuantity).toEqual(3)
    expect(productsRepository.items[1].availableQuantity).toEqual(2)
  })

  it('should not be able to register an order to a non-existing attendant', async () => {
    const product01 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 5,
      available: true
    })
    const product02 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 3,
      available: true
    })
    productsRepository.create(product01)
    productsRepository.create(product02)

    const result = await sut.execute({
      attendantId: 'non-existing-attendant-id',
      customerName: 'Customer Name',
      items: [
        {
          productId: product01.id.toString(),
          quantity: 2
        },
        {
          productId: product02.id.toString(),
          quantity: 1
        }
      ]
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(productsRepository.items[0].availableQuantity).toEqual(5)
    expect(productsRepository.items[1].availableQuantity).toEqual(3)
  })

  it('should not be able to register an order to a non-existing product', async () => {
    const attendant = makeAttendant()
    attendatsRepository.items.push(attendant)

    const product01 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 5,
      available: true
    })
    productsRepository.create(product01)

    const result = await sut.execute({
      attendantId: attendant.id.toString(),
      customerName: 'Customer Name',
      items: [
        {
          productId: product01.id.toString(),
          quantity: 2
        },
        {
          productId: 'non-existing-product-id',
          quantity: 1
        }
      ]
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(productsRepository.items[0].availableQuantity).toEqual(5)
  })

  it('should not be able to register an order with unavailable product', async () => {
    const attendant = makeAttendant()
    attendatsRepository.items.push(attendant)

    const product01 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 5,
      available: false
    })

    productsRepository.create(product01)

    const result = await sut.execute({
      attendantId: attendant.id.toString(),
      customerName: 'Customer Name',
      items: [
        {
          productId: product01.id.toString(),
          quantity: 2
        }
      ]
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnavailableProductError)
  })

  it('should not be able to register an order to a product with insufficient stock', async () => {
    const attendant = makeAttendant()
    attendatsRepository.items.push(attendant)

    const product01 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 5,
      available: true
    })
    const product02 = makeProduct({
      priceInCents: 1000,
      availableQuantity: 3,
      available: true
    })
    productsRepository.create(product01)
    productsRepository.create(product02)

    const result = await sut.execute({
      attendantId: attendant.id.toString(),
      customerName: 'Customer Name',
      items: [
        {
          productId: product01.id.toString(),
          quantity: 2
        },
        {
          productId: product02.id.toString(),
          quantity: 4
        }
      ]
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InsufficientStockError)
    expect(productsRepository.items[0].availableQuantity).toEqual(5)
    expect(productsRepository.items[1].availableQuantity).toEqual(3)
  })
})
