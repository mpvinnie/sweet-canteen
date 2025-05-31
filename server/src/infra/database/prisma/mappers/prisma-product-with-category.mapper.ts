import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProductWithCategory } from '@/domain/app/application/use-cases/value-objects/product-with-category'
import {
  Category as PrismaCategory,
  Product as PrismaProduct
} from 'generated/prisma'

type PrismaProductWithCategory = PrismaProduct & {
  category: PrismaCategory
}

export class PrismaProductWithCategoryMapper {
  static toDomain(raw: PrismaProductWithCategory): ProductWithCategory {
    return ProductWithCategory.create({
      productId: new UniqueEntityID(raw.id),
      name: raw.name,
      description: raw.description,
      priceInCents: raw.priceInCents,
      availableQuantity: raw.availableQuantity,
      categoryId: new UniqueEntityID(raw.categoryId),
      category: raw.category.name,
      available: raw.available,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? undefined
    })
  }
}
