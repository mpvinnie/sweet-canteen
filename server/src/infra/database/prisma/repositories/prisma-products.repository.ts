import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyProductsFilters,
  ProductsRepository
} from '@/domain/app/application/repositories/products.repository'
import { Product } from '@/domain/app/enterprise/entities/product'
import { prisma } from '..'
import { PrismaProductWithCategoryMapper } from '../mappers/prisma-product-with-category.mapper'
import { PrismaProductMapper } from '../mappers/prisma-product.mapper'

export class PrismaProductsRepository implements ProductsRepository {
  async findMany(
    { name, available, categoryId }: FindManyProductsFilters,
    { page }: PaginationParams
  ) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        name: {
          contains: name,
          mode: 'insensitive'
        },
        available,
        categoryId
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findManyWithCategory(
    { name, available, categoryId }: FindManyProductsFilters,
    { page }: PaginationParams
  ) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        name: {
          contains: name,
          mode: 'insensitive'
        },
        available,
        categoryId
      },
      include: {
        category: true
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return products.map(PrismaProductWithCategoryMapper.toDomain)
  }

  async findManyByIds(productIds: string[]) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        id: {
          in: productIds
        }
      }
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        isActive: true,
        id
      }
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findByIdWithCategory(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        isActive: true,
        id
      },
      include: {
        category: true
      }
    })

    if (!product) {
      return null
    }

    return PrismaProductWithCategoryMapper.toDomain(product)
  }

  async create(product: Product) {
    await prisma.product.create({
      data: PrismaProductMapper.toPrisma(product)
    })
  }

  async save(product: Product) {
    await prisma.product.update({
      where: {
        id: product.id.toString()
      },
      data: PrismaProductMapper.toPrisma(product)
    })
  }

  async saveWithCategory(product: Product) {
    const productWithCategory = await prisma.product.update({
      where: {
        id: product.id.toString()
      },
      data: PrismaProductMapper.toPrisma(product),
      include: {
        category: true
      }
    })

    return PrismaProductWithCategoryMapper.toDomain(productWithCategory)
  }

  async delete(product: Product) {
    await prisma.product.update({
      where: {
        id: product.id.toString()
      },
      data: {
        isActive: false
      }
    })
  }
}
