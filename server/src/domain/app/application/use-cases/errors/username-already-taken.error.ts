import { UseCaseError } from '@/core/errors/use-case.error'

export class UsernameAlreadyTakenError extends Error implements UseCaseError {
  readonly code = 'USERNAME_ALREADY_TAKEN'

  constructor() {
    super(`This username is already taken.`)
  }
}
