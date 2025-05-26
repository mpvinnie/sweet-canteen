import { UseCaseError } from '@/core/errors/use-case.error'

export class InvalidUsernameError extends Error implements UseCaseError {
  constructor() {
    super(`Invalid username.`)
  }
}
