import { Either, left, right } from '@/core/either'
import { Cook } from '../../enterprise/entities/cook'
import { CooksRepository } from '../repositories/cooks.repository'
import { Username } from './value-objects/username'
import { UsernameAlreadyTakenError } from './errors/username-already-taken.error'
import { HashProvider } from '../providers/hash.provider'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface EditCookUseCaseRequest {
  cookId: string
  name: string
  username?: string
  password?: string
}

type EditCookUseCaseResponse = Either<
  ResourceNotFoundError | UsernameAlreadyTakenError,
  {
    cook: Cook
  }
>

export class EditCookUseCase {
  constructor(
    private cooksRepository: CooksRepository,
    private hashProvider: HashProvider
  ) {}

  async execute({
    cookId,
    name,
    username,
    password
  }: EditCookUseCaseRequest): Promise<EditCookUseCaseResponse> {
    const cook = await this.cooksRepository.findById(cookId)

    if (!cook) {
      return left(new ResourceNotFoundError())
    }

    if (username) {
      const newUsername = Username.create(username)

      if (newUsername.isLeft()) {
        return left(newUsername.value)
      }

      const existingCook = await this.cooksRepository.findByUsername(username)

      if (existingCook) {
        return left(new UsernameAlreadyTakenError())
      }

      cook.username = newUsername.value
    }

    if (password) {
      const passwordHash = await this.hashProvider.hash(password)

      cook.passwordHash = passwordHash
    }

    cook.name = name

    await this.cooksRepository.save(cook)

    return right({
      cook
    })
  }
}
