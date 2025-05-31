import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { makeCategory } from 'test/factories/make-category'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { GetProductByIdUseCase } from './get-product-by-id'

let categoriesRepository: InMemoryCategoriesRepository
let productsRepository: InMemoryProductsRepository
let sut: GetProductByIdUseCase

describe('Get product by id', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    sut = new GetProductByIdUseCase(productsRepository)
  })
  it('should be able to find a product by its id', async () => {
    const category = makeCategory()
    const newProduct = makeProduct({
      categoryId: category.id
    })

    await categoriesRepository.create(category)
    await productsRepository.create(newProduct)

    const result = await sut.execute({
      productId: newProduct.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          productId: newProduct.id,
          category: category.name
        })
      })
    )
  })

  it('should not be able to find a non-existing product', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
