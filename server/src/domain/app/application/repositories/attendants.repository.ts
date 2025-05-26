import { PaginationParams } from '@/core/repositories/pagination-params'
import { Attendant } from '../../enterprise/entities/attendant'

export interface FindManyAttendantsFilters {
  name?: string
}

export interface AttendantsRepository {
  findById(attendantId: string): Promise<Attendant | null>
  findByUsername(username: string): Promise<Attendant | null>
  findMany(
    filters: FindManyAttendantsFilters,
    params: PaginationParams
  ): Promise<Attendant[]>
  create(attendant: Attendant): Promise<void>
  save(attendant: Attendant): Promise<void>
  delete(attendant: Attendant): Promise<void>
}
