import { CategoriesRepository } from '@/domain/app/application/repositories/categories.repository'
import { Category } from '@/domain/app/enterprise/entities/category'
import { prisma } from '..'
import { PrismaCategoryMapper } from '../mappers/prisma-category.mapper'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findByName(categoryName: string) {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName
      }
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async create(category: Category) {
    await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(category)
    })
  }
}
