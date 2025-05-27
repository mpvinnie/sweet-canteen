import { UseCaseError } from '@/core/errors/use-case.error'

export class InsufficientStockError extends Error implements UseCaseError {
  readonly code = 'INSUFICIENT_STOCK'

  constructor(productName: string) {
    super(`Insufficient stock for product ${productName}.`)
  }
}
