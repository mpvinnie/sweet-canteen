import { UseCaseError } from '@/core/errors/use-case.error'

export class UsernameAlreadyTakenError extends Error implements UseCaseError {
  constructor() {
    super(`This username is already taken.`)
  }
}
