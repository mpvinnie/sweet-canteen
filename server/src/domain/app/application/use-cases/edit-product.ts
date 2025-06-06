import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Category } from '../../enterprise/entities/category'
import { CategoriesRepository } from '../repositories/categories.repository'
import { ProductsRepository } from '../repositories/products.repository'
import { ProductWithCategory } from './value-objects/product-with-category'

interface EditProductUseCaseRequest {
  productId: string
  name: string
  description: string
  priceInCents: number
  available: boolean
  availableQuantity: number
  categoryName: string
}

type EditProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: ProductWithCategory
  }
>

export class EditProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({
    productId,
    name,
    description,
    priceInCents,
    available,
    availableQuantity,
    categoryName
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    const category = await this.categoriesRepository.findByName(categoryName)

    let categoryId = category?.id

    if (!categoryId) {
      const newCategory = Category.create({
        name: categoryName
      })

      await this.categoriesRepository.create(newCategory)
      categoryId = newCategory.id
    }

    product.name = name
    product.description = description
    product.priceInCents = priceInCents
    product.available = available
    product.availableQuantity = availableQuantity
    product.categoryId = categoryId

    const productWithCategory =
      await this.productsRepository.saveWithCategory(product)

    return right({
      product: productWithCategory
    })
  }
}
