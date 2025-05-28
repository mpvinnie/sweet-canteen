import { UseCaseError } from '@/core/errors/use-case.error'

export class WrongCredentialsError extends Error implements UseCaseError {
  readonly code = 'WRONG_CREDENTIALS'

  constructor() {
    super(`Wrong credentials.`)
  }
}
