import { Either, right } from '@/core/either'
import { Category } from '../../enterprise/entities/category'
import { Product } from '../../enterprise/entities/product'
import { StorageProvider } from '../providers/storage.provider'
import { CategoriesRepository } from '../repositories/categories.repository'
import { ProductsRepository } from '../repositories/products.repository'

interface RegisterProductUseCaseRequest {
  name: string
  description: string
  priceInCents: number
  availableQuantity: number
  categoryName: string
  imageFilename: string
}

type RegisterProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

export class RegisterProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({
    name,
    description,
    priceInCents,
    availableQuantity,
    categoryName,
    imageFilename
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const category = await this.categoriesRepository.findByName(categoryName)

    let categoryId = category?.id

    if (!categoryId) {
      const newCategory = Category.create({
        name: categoryName
      })

      await this.categoriesRepository.create(newCategory)
      categoryId = newCategory.id
    }

    await this.storageProvider.saveFile(imageFilename)

    const product = Product.create({
      name,
      description,
      priceInCents,
      availableQuantity,
      categoryId,
      image: imageFilename
    })

    await this.productsRepository.create(product)

    return right({
      product
    })
  }
}
