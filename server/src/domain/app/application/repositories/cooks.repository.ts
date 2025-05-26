import { PaginationParams } from '@/core/repositories/pagination-params'
import { Cook } from '../../enterprise/entities/cook'

export interface FindManyCooksFilters {
  name?: string
}

export interface CooksRepository {
  findById(cookId: string): Promise<Cook | null>
  findByUsername(username: string): Promise<Cook | null>
  findMany(
    filters: FindManyCooksFilters,
    params: PaginationParams
  ): Promise<Cook[]>
  findAll(): Promise<Cook[]>
  create(cook: Cook): Promise<void>
  save(cook: Cook): Promise<void>
  delete(cook: Cook): Promise<void>
}
