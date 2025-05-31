import { Either, right } from '@/core/either'
import { ProductsRepository } from '../repositories/products.repository'
import { ProductWithCategory } from './value-objects/product-with-category'

interface FetchProductsUseCaseRequest {
  name?: string
  available?: boolean
  categoryId?: string
  page: number
}

type FetchProductsUseCaseResponse = Either<
  null,
  {
    products: ProductWithCategory[]
  }
>

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    available,
    categoryId,
    page
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyWithCategory(
      {
        name,
        available,
        categoryId
      },
      { page }
    )

    return right({
      products
    })
  }
}
