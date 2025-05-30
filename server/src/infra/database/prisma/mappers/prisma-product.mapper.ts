import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/app/enterprise/entities/product'
import { Prisma, Product as PrismaProduct } from 'generated/prisma'

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        priceInCents: raw.priceInCents,
        availableQuantity: raw.availableQuantity,
        categoryId: new UniqueEntityID(raw.categoryId),
        available: raw.available,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      availableQuantity: product.availableQuantity,
      categoryId: product.categoryId.toString(),
      available: product.available,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}
