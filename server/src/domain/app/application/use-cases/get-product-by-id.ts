import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { ProductsRepository } from '../repositories/products.repository'
import { ProductWithCategory } from './value-objects/product-with-category'

interface GetProductByIdUseCaseRequest {
  productId: string
}

type GetProductByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { product: ProductWithCategory }
>

export class GetProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId
  }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
    const product =
      await this.productsRepository.findByIdWithCategory(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({ product })
  }
}
