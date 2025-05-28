import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { Admin } from '@/domain/app/enterprise/entities/admin'
import { Prisma, User as PrismaAdmin } from 'generated/prisma'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaAdmin): Admin {
    return Admin.create(
      {
        name: raw.name,
        username: unwrapOrFail(Username.create(raw.username)),
        passwordHash: raw.passwordHash,
        createdAt: raw.createdAt
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      name: admin.name,
      username: admin.username.value,
      passwordHash: admin.passwordHash,
      role: 'ADMIN',
      createdAt: admin.createdAt
    }
  }
}
