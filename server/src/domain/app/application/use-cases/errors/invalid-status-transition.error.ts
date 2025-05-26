import { UseCaseError } from '@/core/errors/use-case.error'

export class InvalidStatusTransition extends Error implements UseCaseError {
  constructor(from: string, to: string) {
    super(`Invalid transition from ${from} to ${to}.`)
  }
}
