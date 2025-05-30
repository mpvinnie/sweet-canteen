import { faker } from '@faker-js/faker'
import { User, UserProps } from '@/domain/app/enterprise/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const product = User.create(
    {
      name: faker.food.dish(),
      description: faker.food.description(),
      priceInCents: Number(faker.commerce.price({ max: 5000 })),
      availableQuantity: faker.number.int(20),
      categoryId: new UniqueEntityID('category-id'),
      ...override
    },
    id
  )

  return product
}
