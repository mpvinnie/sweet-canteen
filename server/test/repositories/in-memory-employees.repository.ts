import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  EmployeesRepository,
  FindManyFilters
} from '@/domain/app/application/repositories/employees.repository'
import { Employee } from '@/domain/app/enterprise/entities/employee'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public items: Employee[] = []

  async findById(id: string) {
    const employee = this.items.find(employee => employee.id.toString() === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByUsername(username: string) {
    const employee = this.items.find(
      employee => employee.username.value === username
    )

    if (!employee) {
      return null
    }

    return employee
  }

  async findMany({ name }: FindManyFilters, { page }: PaginationParams) {
    const employees = this.items
      .filter(employee => {
        if (name && !employee.name.toLowerCase().includes(name.toLowerCase())) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return employees
  }

  async save(employee: Employee) {
    const findIndex = this.items.findIndex(item => item.id.equals(employee.id))

    this.items[findIndex] = employee
  }
}
