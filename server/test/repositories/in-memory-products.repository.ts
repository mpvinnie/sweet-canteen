import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyProductsFilters,
  ProductsRepository
} from '@/domain/app/application/repositories/products.repository'

import { Product } from '@/domain/app/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findMany(
    { name, available, categoryId }: FindManyProductsFilters,
    { page }: PaginationParams
  ) {
    const filteredProducts = this.items
      .filter(product => {
        if (name && !product.name.toLowerCase().includes(name.toLowerCase())) {
          return false
        }

        if (typeof available === 'boolean' && product.available !== available) {
          return false
        }

        if (categoryId && product.categoryId.toValue() !== categoryId) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredProducts
  }

  async findManyByIds(productIds: string[]) {
    const products = this.items.filter(product =>
      productIds.includes(product.id.toString())
    )

    return products
  }

  async findById(id: string) {
    const product = this.items.find(product => product.id.toValue() === id)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    this.items[productIndex] = product
  }

  async delete(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    this.items.splice(productIndex, 1)
  }
}
