import { CategoriesRepository } from '@/domain/app/application/repositories/categories.repository'
import { Category } from '@/domain/app/enterprise/entities/category'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async findByName(categoryName: string) {
    const category = this.items.find(category => category.name === categoryName)

    if (!category) {
      return null
    }

    return category
  }

  async create(category: Category) {
    this.items.push(category)
  }
}
