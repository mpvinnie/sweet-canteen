import { UseCaseError } from '@/core/errors/use-case.error'

export class InvalidUsernameError extends Error implements UseCaseError {
  readonly code = 'INVALID_USERNAME'

  constructor() {
    super(`Invalid username.`)
  }
}
