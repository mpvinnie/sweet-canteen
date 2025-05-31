import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { ProductsRepository } from '../repositories/products.repository'

interface DeleteProductUseCaseRequest {
  productId: string
}

type DeleteProductUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    await this.productsRepository.delete(product)

    return right(null)
  }
}
