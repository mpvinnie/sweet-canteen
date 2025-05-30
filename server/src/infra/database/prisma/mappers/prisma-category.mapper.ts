import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/app/enterprise/entities/category'
import { Prisma, Category as PrismaCategory } from 'generated/prisma'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }
  }
}
