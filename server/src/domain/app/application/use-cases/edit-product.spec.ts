import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { EditProductUseCase } from './edit-product'

let productsRepository: InMemoryProductsRepository
let categoriesRepository: InMemoryCategoriesRepository
let sut: EditProductUseCase

describe('Edit product', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    sut = new EditProductUseCase(productsRepository, categoriesRepository)
  })

  it('should be able to edit a product', async () => {
    const newProduct = makeProduct()
    productsRepository.create(newProduct)

    const result = await sut.execute({
      productId: newProduct.id.toString(),
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      available: true,
      categoryName: 'Lanche'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      product: expect.objectContaining({
        name: 'Product 01',
        description: 'Description 01',
        priceInCents: 10,
        availableQuantity: 10,
        available: true,
        category: 'Lanche'
      })
    })
    expect(productsRepository.items[0]).toMatchObject({
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      available: true
    })
    expect(categoriesRepository.items[0].name).toEqual('Lanche')
  })

  it('should not be able to edit a non-existing product', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      available: true,
      categoryName: 'Lanche'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
