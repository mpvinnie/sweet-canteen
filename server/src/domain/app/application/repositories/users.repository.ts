import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '../../enterprise/entities/user'

export interface FindManyEmployeesFilters {
  name?: string
}

export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findManyEmployees(
    filters: FindManyEmployeesFilters,
    params: PaginationParams
  ): Promise<User[]>
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
  save(user: User): Promise<void>
}
