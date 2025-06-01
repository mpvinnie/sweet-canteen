import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyEmployeesFilters,
  UsersRepository
} from '@/domain/app/application/repositories/users.repository'
import { User } from '@/domain/app/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find(item => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find(item => item.username.value === username)

    if (!user) {
      return null
    }

    return user
  }

  async findManyEmployees(
    { name }: FindManyEmployeesFilters,
    { page }: PaginationParams
  ) {
    const filteredEmployees = this.items
      .filter(user => {
        if (user.role === 'admin') {
          return false
        }

        if (name && !user.name.toLowerCase().includes(name.toLowerCase())) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredEmployees
  }

  async create(user: User) {
    this.items.push(user)
  }
}
