import { Either, left, right } from '@/core/either'
import { Cook } from '../../enterprise/entities/cook'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { HashProvider } from '../providers/hash.provider'
import { Username } from './value-objects/username'
import { InvalidUsernameError } from './errors/invalid-username.error'
import { CooksRepository } from '../repositories/cooks.repository'

interface RegisterCookUseCaseRequest {
  name: string
  username: string
  password: string
}

type RegisterCookUseCaseResponse = Either<
  UsernameAlreadyTakenError | InvalidUsernameError,
  {
    cook: Cook
  }
>

export class RegisterCookUseCase {
  constructor(
    private cooksRepository: CooksRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    name,
    username,
    password
  }: RegisterCookUseCaseRequest): Promise<RegisterCookUseCaseResponse> {
    const existingCook = await this.cooksRepository.findByUsername(username)

    if (existingCook) {
      return left(new UsernameAlreadyTakenError())
    }

    const passwordHash = await this.hashProvider.hash(password)

    const usernameOrError = Username.create(username)

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    const cook = Cook.create({
      name,
      username: usernameOrError.value,
      passwordHash
    })

    await this.cooksRepository.create(cook)

    return right({
      cook
    })
  }
}
