import { Either, right } from '@/core/either'
import { Category } from '../../enterprise/entities/category'
import { Product } from '../../enterprise/entities/product'
import { CategoriesRepository } from '../repositories/categories.repository'
import { ProductsRepository } from '../repositories/products.repository'

interface RegisterProductUseCaseRequest {
  name: string
  description: string
  priceInCents: number
  availableQuantity: number
  categoryName: string
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
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({
    name,
    description,
    priceInCents,
    availableQuantity,
    categoryName
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

    const product = Product.create({
      name,
      description,
      priceInCents,
      availableQuantity,
      categoryId
    })

    await this.productsRepository.create(product)

    return right({
      product
    })
  }
}
