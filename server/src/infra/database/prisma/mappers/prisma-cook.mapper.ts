import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { Cook } from '@/domain/app/enterprise/entities/cook'
import { Prisma, User as PrismaCook } from 'generated/prisma'

export class PrismaCookMapper {
  static toDomain(raw: PrismaCook): Cook {
    return Cook.create(
      {
        name: raw.name,
        username: unwrapOrFail(Username.create(raw.username)),
        passwordHash: raw.passwordHash,
        createdAt: raw.createdAt
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(cook: Cook): Prisma.UserUncheckedCreateInput {
    return {
      id: cook.id.toString(),
      name: cook.name,
      username: cook.username.value,
      passwordHash: cook.passwordHash,
      role: 'COOK',
      createdAt: cook.createdAt
    }
  }
}
