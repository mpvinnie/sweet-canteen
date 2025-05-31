import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyProductsFilters,
  ProductsRepository
} from '@/domain/app/application/repositories/products.repository'
import { Product } from '@/domain/app/enterprise/entities/product'
import { prisma } from '..'
import { PrismaProductMapper } from '../mappers/prisma-product.mapper'

export class PrismaProductsRepository implements ProductsRepository {
  async findMany(
    { name, available, categoryId }: FindManyProductsFilters,
    { page }: PaginationParams
  ) {
    const products = await prisma.product.findMany({
      where: {
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

  async findManyByIds(productIds: string[]) {
    const products = await prisma.product.findMany({
      where: {
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
        id
      }
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
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

  async delete(product: Product) {
    await prisma.product.delete({
      where: {
        id: product.id.toString()
      }
    })
  }
}
