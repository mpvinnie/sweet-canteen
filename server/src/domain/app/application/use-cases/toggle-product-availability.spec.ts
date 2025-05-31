import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { ToggleProductAvailabilityUseCase } from './toggle-product-availability'

let categoriesRepository: InMemoryCategoriesRepository
let productsRepository: InMemoryProductsRepository
let sut: ToggleProductAvailabilityUseCase

describe('Toggle product availability', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    sut = new ToggleProductAvailabilityUseCase(productsRepository)
  })

  it('should be able to toggle the product availability', async () => {
    const newProduct = makeProduct()
    productsRepository.create(newProduct)

    expect(productsRepository.items[0].available).toBeFalsy()

    const result = await sut.execute({
      productId: newProduct.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      product: expect.objectContaining({
        available: true
      })
    })
    expect(productsRepository.items[0].available).toBeTruthy()
  })

  it('should  not be able to toggle the availability of a non-existing product', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
