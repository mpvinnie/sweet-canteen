import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyProductsFilters,
  ProductsRepository
} from '@/domain/app/application/repositories/products.repository'
import { ProductWithCategory } from '@/domain/app/application/use-cases/value-objects/product-with-category'

import { Product } from '@/domain/app/enterprise/entities/product'
import { InMemoryCategoriesRepository } from './in-memory-categories.repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  constructor(private categoriesRepository: InMemoryCategoriesRepository) {}

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

  async findManyWithCategory(
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
      .map(product => {
        const category = this.categoriesRepository.items.find(category =>
          category.id.equals(product.categoryId)
        )

        if (!category) {
          throw new Error(
            `Category with ID "${product.categoryId.toString()}" does not exist.`
          )
        }

        return ProductWithCategory.create({
          productId: product.id,
          name: product.name,
          description: product.description,
          priceInCents: product.priceInCents,
          availableQuantity: product.availableQuantity,
          categoryId: product.categoryId,
          category: category.name,
          available: product.available,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        })
      })

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

  async findByIdWithCategory(id: string) {
    const product = this.items.find(product => product.id.toString() === id)

    if (!product) {
      return null
    }

    const category = this.categoriesRepository.items.find(category =>
      category.id.equals(product.categoryId)
    )

    if (!category) {
      throw new Error(
        `Category with ID "${product.categoryId.toString()}" does not exist.`
      )
    }

    return ProductWithCategory.create({
      productId: product.id,
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      availableQuantity: product.availableQuantity,
      categoryId: product.categoryId,
      category: category.name,
      available: product.available,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    this.items[productIndex] = product
  }

  async saveWithCategory(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    this.items[productIndex] = product

    const category = this.categoriesRepository.items.find(category =>
      category.id.equals(product.categoryId)
    )

    if (!category) {
      throw new Error(
        `Category with ID "${product.categoryId.toString()}" does not exist.`
      )
    }

    return ProductWithCategory.create({
      productId: product.id,
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      availableQuantity: product.availableQuantity,
      categoryId: product.categoryId,
      category: category.name,
      available: product.available,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }

  async delete(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    this.items.splice(productIndex, 1)
  }
}
