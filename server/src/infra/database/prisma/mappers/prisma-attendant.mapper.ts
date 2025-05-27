import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { Attendant } from '@/domain/app/enterprise/entities/attendant'
import { Prisma, User as PrismaAttendant } from 'generated/prisma'

export class PrismaAttendantMapper {
  static toDomain(raw: PrismaAttendant): Attendant {
    return Attendant.create(
      {
        name: raw.name,
        username: unwrapOrFail(Username.create(raw.username)),
        passwordHash: raw.passwordHash,
        createdAt: raw.createdAt
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(attendant: Attendant): Prisma.UserUncheckedCreateInput {
    return {
      id: attendant.id.toString(),
      name: attendant.name,
      username: attendant.username.value,
      passwordHash: attendant.passwordHash,
      role: 'ATTENDANT',
      createdAt: attendant.createdAt
    }
  }
}
