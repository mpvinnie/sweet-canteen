import { Either, left, right } from '@/core/either'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface DeleteProductUseCaseRequest {
  productId: string
}

type DeleteProductUseCaseResponse = Either<ResourceNotFoundError, {}>

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

    return right({})
  }
}
