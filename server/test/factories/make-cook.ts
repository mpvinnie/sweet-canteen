import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Cook, CookProps } from '@/domain/app/enterprise/entities/cook'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import { unwrapOrFail } from '@/core/either'

export function makeCook(
  override: Partial<CookProps> = {},
  id?: UniqueEntityID
) {
  const usernameCreated = unwrapOrFail(
    Username.create(faker.internet.username())
  )

  const cook = Cook.create(
    {
      name: faker.person.fullName(),
      username: usernameCreated,
      passwordHash: faker.internet.password(),
      ...override
    },
    id
  )

  return cook
}
