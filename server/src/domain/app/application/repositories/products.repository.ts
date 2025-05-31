import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product } from '../../enterprise/entities/product'
import { ProductWithCategory } from '../use-cases/value-objects/product-with-category'

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
  findManyWithCategory(
    filters: FindManyProductsFilters,
    params: PaginationParams
  ): Promise<ProductWithCategory[]>
  findManyByIds(productIds: string[]): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  findByIdWithCategory(id: string): Promise<ProductWithCategory | null>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
