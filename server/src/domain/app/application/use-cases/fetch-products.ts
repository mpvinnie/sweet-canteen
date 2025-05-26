import { Either, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface FetchProductsUseCaseRequest {
  name?: string
  available?: boolean
  categoryId?: string
  page: number
}

type FetchProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
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
    const products = await this.productsRepository.findMany(
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
