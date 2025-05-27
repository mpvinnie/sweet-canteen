import { UseCaseError } from '@/core/errors/use-case.error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  readonly code = 'RESOURCE_NOT_FOUND'

  constructor() {
    super('Resource not found.')
  }
}
