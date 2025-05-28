import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin, AdminProps } from '@/domain/app/enterprise/entities/admin'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { unwrapOrFail } from '@/core/either'

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID
) {
  const usernameCreated = unwrapOrFail(
    Username.create(faker.internet.username())
  )

  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      username: usernameCreated,
      passwordHash: faker.internet.password(),
      ...override
    },
    id
  )

  return admin
}
