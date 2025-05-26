import { Either, left, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface ToggleProductAvailabilityUseCaseRequest {
  productId: string
}

type ToggleProductAvailabilityUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class ToggleProductAvailabilityUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId
  }: ToggleProductAvailabilityUseCaseRequest): Promise<ToggleProductAvailabilityUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.available = !product.available

    await this.productsRepository.save(product)

    return right({
      product
    })
  }
}
