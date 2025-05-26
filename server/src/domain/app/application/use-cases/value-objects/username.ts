import { Either, left, right } from '@/core/either'
import { InvalidUsernameError } from '../errors/invalid-username.error'

export class Username {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(username: string): Either<InvalidUsernameError, Username> {
    const isValid = /^[a-zA-Z0-9_.-]+$/.test(username)

    if (!isValid) {
      return left(new InvalidUsernameError())
    }

    return right(new Username(username))
  }
}
