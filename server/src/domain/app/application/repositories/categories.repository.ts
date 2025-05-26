import { Category } from '../../enterprise/entities/category'

export interface CategoriesRepository {
  findByName(categoryName: string): Promise<Category | null>
  create(category: Category): Promise<void>
}
