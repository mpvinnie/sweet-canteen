import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product } from '../../enterprise/entities/product'

export interface FindManyProductsFilters {
  name?: string
  available?: boolean
  categoryId?: string
}

export interface ProductsRepository {
  findMany(
    filters: FindManyProductsFilters,
    params: PaginationParams
  ): Promise<Product[]>
  findManyByIds(productIds: string[]): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
