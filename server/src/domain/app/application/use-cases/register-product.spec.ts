import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { RegisterProductUseCase } from './register-product'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { makeCategory } from 'test/factories/make-category'

let productsRepository: InMemoryProductsRepository
let categoriesRepository: InMemoryCategoriesRepository
let sut: RegisterProductUseCase

describe('Register product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new RegisterProductUseCase(productsRepository, categoriesRepository)
  })

  it('should be able to register a product and its category', async () => {
    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      categoryName: 'Lanche'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      product: productsRepository.items[0]
    })
    expect(categoriesRepository.items[0].name).toEqual('Lanche')
  })

  it('should be able to link an existing category to a product', async () => {
    const category = makeCategory()
    categoriesRepository.create(category)

    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      categoryName: category.name
    })

    expect(result.isRight()).toBe(true)
    expect(categoriesRepository.items.length).toEqual(1)
    expect(categoriesRepository.items[0].name).toEqual(category.name)
  })
})
