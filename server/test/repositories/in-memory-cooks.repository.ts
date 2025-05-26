import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  CooksRepository,
  FindManyCooksFilters
} from '@/domain/app/application/repositories/cooks.repository'
import { Cook } from '@/domain/app/enterprise/entities/cook'

export class InMemoryCooksRepository implements CooksRepository {
  public items: Cook[] = []

  async findById(cookId: string) {
    const cook = this.items.find(cook => cook.id.toString() === cookId)

    if (!cook) {
      return null
    }

    return cook
  }

  async findByUsername(username: string) {
    const cook = this.items.find(cook => cook.username.value === username)

    if (!cook) {
      return null
    }

    return cook
  }

  async findMany({ name }: FindManyCooksFilters, { page }: PaginationParams) {
    const filteredCooks = this.items
      .filter(cook => {
        if (
          name &&
          !cook.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredCooks
  }

  async findAll() {
    return this.items
  }

  async create(cook: Cook) {
    this.items.push(cook)
  }

  async save(cook: Cook) {
    const findIndex = this.items.findIndex(item => item.id.equals(cook.id))

    this.items[findIndex] = cook
  }

  async delete(cook: Cook) {
    this.items = this.items.filter(item => !item.id.equals(cook.id))
  }
}
