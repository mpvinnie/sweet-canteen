import { makeCategory } from 'test/factories/make-category'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { FetchProductsUseCase } from './fetch-products'

let categoriesRepository: InMemoryCategoriesRepository
let productsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch products', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch the products', async () => {
    const category = makeCategory()

    categoriesRepository.create(category)

    for (let i = 1; i <= 10; i++) {
      await productsRepository.create(
        makeProduct({
          categoryId: category.id
        })
      )
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(10)
  })

  it('should be able to filter the products', async () => {
    const category01 = makeCategory({
      name: 'Juice'
    })
    const category02 = makeCategory()

    categoriesRepository.create(category01)
    categoriesRepository.create(category02)

    const product01 = makeProduct({
      name: 'Product 01',
      categoryId: category01.id,
      available: true
    })

    const product02 = makeProduct({
      name: 'Product 01',
      categoryId: category01.id,
      availableQuantity: 0
    })

    const product03 = makeProduct({
      categoryId: category02.id,
      available: true
    })

    await productsRepository.create(product01)
    await productsRepository.create(product02)
    await productsRepository.create(product03)

    const result = await sut.execute({
      name: 'Product 01',
      available: true,
      categoryId: category01.id.toString(),
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(1)
    expect(result.value?.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Product 01',
          category: 'Juice'
        })
      ])
    )
  })

  it('should be able to fetch paginated products', async () => {
    const category = makeCategory()

    categoriesRepository.create(category)

    for (let i = 1; i <= 22; i++) {
      await productsRepository.create(
        makeProduct({
          categoryId: category.id
        })
      )
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(2)
  })
})
