import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product, ProductProps } from '@/domain/app/enterprise/entities/product'
import { faker } from '@faker-js/faker'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID
) {
  const product = Product.create(
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
