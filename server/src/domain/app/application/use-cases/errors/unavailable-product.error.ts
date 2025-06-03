import { UseCaseError } from '@/core/errors/use-case.error'

export class UnavailableProductError extends Error implements UseCaseError {
  readonly code = 'UNAVAILABLE_PRODUCT'

  constructor(productName: string) {
    super(`Unavailable product ${productName}.`)
  }
}
