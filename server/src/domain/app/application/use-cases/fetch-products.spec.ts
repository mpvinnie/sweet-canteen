import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { FetchProductsUseCase } from './fetch-products'
import { makeProduct } from 'test/factories/make-product'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch products', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch the products', async () => {
    for (let i = 1; i <= 10; i++) {
      await productsRepository.create(makeProduct())
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(10)
  })

  it('should be able to filter the products', async () => {
    const product01 = makeProduct({
      name: 'Product 01',
      categoryId: new UniqueEntityID('category-id-01'),
      available: true
    })

    const product02 = makeProduct({
      name: 'Product 01',
      categoryId: new UniqueEntityID('category-id-01'),
      availableQuantity: 0
    })

    const product03 = makeProduct({
      categoryId: new UniqueEntityID('category-id-02'),
      available: true
    })

    await productsRepository.create(product01)
    await productsRepository.create(product02)
    await productsRepository.create(product03)

    const result = await sut.execute({
      name: 'Product 01',
      available: true,
      categoryId: 'category-id-01',
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(1)
    expect(result.value?.products[0]).toEqual(product01)
  })

  it('should be able to fetch paginated products', async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create(makeProduct())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(2)
  })
})
