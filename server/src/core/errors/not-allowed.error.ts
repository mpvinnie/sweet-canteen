import { UseCaseError } from '@/core/errors/use-case.error'

export class NotAllowedError extends Error implements UseCaseError {
  readonly code = 'NOT_ALLOWED'

  constructor() {
    super('Not allowed.')
  }
}
