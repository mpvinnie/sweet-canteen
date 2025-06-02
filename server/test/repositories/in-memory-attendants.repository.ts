import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  AttendantsRepository,
  FindManyAttendantsFilters
} from '@/domain/app/application/repositories/attendants.repository'
import { Attendant } from '@/domain/app/enterprise/entities/attendant'

export class InMemoryAttendantsRepository implements AttendantsRepository {
  public items: Attendant[] = []

  async findById(attendantId: string) {
    const attendant = this.items.find(
      attendant => attendant.id.toString() === attendantId
    )

    if (!attendant) {
      return null
    }

    return attendant
  }

  async findByUsername(username: string) {
    const attendant = this.items.find(
      attendant => attendant.username.value === username
    )

    if (!attendant) {
      return null
    }

    return attendant
  }

  async findMany(
    { name }: FindManyAttendantsFilters,
    { page }: PaginationParams
  ) {
    const filteredAttendants = this.items
      .filter(attendant => {
        if (
          name &&
          !attendant.name.toLowerCase().includes(name.toLowerCase())
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredAttendants
  }

  async create(attendant: Attendant) {
    this.items.push(attendant)
  }

  async save(attendant: Attendant) {
    const findIndex = this.items.findIndex(item => item.id.equals(attendant.id))

    this.items[findIndex] = attendant
  }

  async delete(attendant: Attendant) {
    this.items = this.items.filter(item => !item.id.equals(attendant.id))
  }
}
