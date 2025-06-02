import { PaginationParams } from '@/core/repositories/pagination-params'
import { Employee } from '../../enterprise/entities/employee'

export interface FindManyFilters {
  name?: string
}

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>
  findByUsername(username: string): Promise<Employee | null>
  findMany(
    filters: FindManyFilters,
    params: PaginationParams
  ): Promise<Employee[]>
  save(employee: Employee): Promise<void>
}
