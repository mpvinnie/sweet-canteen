import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { GetProductByIdUseCase } from './get-product-by-id'
import { makeProduct } from 'test/factories/make-product'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let productsRepository: InMemoryProductsRepository
let sut: GetProductByIdUseCase

describe('Get product by id', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductByIdUseCase(productsRepository)
  })
  it('should be able to find a product by its id', async () => {
    const newProduct = makeProduct()
    await productsRepository.create(newProduct)

    const result = await sut.execute({
      productId: newProduct.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        product: newProduct
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
