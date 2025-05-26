import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { makeProduct } from 'test/factories/make-product'
import { DeleteProductUseCase } from './delete-product'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

let productsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase

describe('Delete product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(productsRepository)
  })

  it('should be able to delete a product', async () => {
    const newProduct = makeProduct()
    productsRepository.create(newProduct)

    await sut.execute({
      productId: newProduct.id.toString()
    })

    expect(productsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing product', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
