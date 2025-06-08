import { makeCategory } from 'test/factories/make-category'
import { FakeStorageProvider } from 'test/providers/fake-storage.provider'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories.repository'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products.repository'
import { RegisterProductUseCase } from './register-product'

let productsRepository: InMemoryProductsRepository
let categoriesRepository: InMemoryCategoriesRepository
let storageProvider: FakeStorageProvider
let sut: RegisterProductUseCase

describe('Register product', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    productsRepository = new InMemoryProductsRepository(categoriesRepository)
    storageProvider = new FakeStorageProvider()
    sut = new RegisterProductUseCase(
      productsRepository,
      categoriesRepository,
      storageProvider
    )
  })

  it('should be able to register a product and its category', async () => {
    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      categoryName: 'Lanche',
      imageFilename: 'image.png'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      product: productsRepository.items[0]
    })
    expect(categoriesRepository.items[0].name).toEqual('Lanche')
    expect(storageProvider.items).toHaveLength(1)
    expect(storageProvider.items[0]).toBe('image.png')
  })

  it('should be able to link an existing category to a product', async () => {
    const category = makeCategory()
    categoriesRepository.create(category)

    const result = await sut.execute({
      name: 'Product 01',
      description: 'Description 01',
      priceInCents: 10,
      availableQuantity: 10,
      categoryName: category.name,
      imageFilename: 'image.png'
    })

    expect(result.isRight()).toBe(true)
    expect(categoriesRepository.items.length).toEqual(1)
    expect(categoriesRepository.items[0].name).toEqual(category.name)
  })
})
