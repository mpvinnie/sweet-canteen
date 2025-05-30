import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { Admin } from '@/domain/app/enterprise/entities/admin'
import { Attendant } from '@/domain/app/enterprise/entities/attendant'
import { Cook } from '@/domain/app/enterprise/entities/cook'
import { User } from '@/domain/app/enterprise/entities/user'
import { $Enums, Prisma, User as PrismaUser } from 'generated/prisma'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    const userData = {
      name: raw.name,
      username: unwrapOrFail(Username.create(raw.username)),
      passwordHash: raw.passwordHash,
      createdAt: raw.createdAt
    }

    switch (raw.role) {
      case 'ADMIN':
        return Admin.create(userData, new UniqueEntityID(raw.id))
      case 'ATTENDANT':
        return Attendant.create(userData, new UniqueEntityID(raw.id))
      case 'COOK':
        return Cook.create(userData, new UniqueEntityID(raw.id))
      default:
        throw new Error(`Unknown role: ${raw.role}`)
    }
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username.value,
      passwordHash: user.passwordHash,
      role: user.role.toUpperCase() as $Enums.UserRole,
      createdAt: user.createdAt
    }
  }
}
