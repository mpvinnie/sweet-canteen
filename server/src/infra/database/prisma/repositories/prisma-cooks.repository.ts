import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  CooksRepository,
  FindManyCooksFilters
} from '@/domain/app/application/repositories/cooks.repository'
import { Cook } from '@/domain/app/enterprise/entities/cook'
import { prisma } from '..'
import { PrismaCookMapper } from '../mappers/prisma-cook.mapper'

export class PrismaCooksRepository implements CooksRepository {
  async findById(cookId: string) {
    const cook = await prisma.user.findUnique({
      where: {
        id: cookId
      }
    })

    if (!cook) {
      return null
    }

    return PrismaCookMapper.toDomain(cook)
  }

  async findByUsername(username: string) {
    const cook = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!cook) {
      return null
    }

    return PrismaCookMapper.toDomain(cook)
  }

  async findMany({ name }: FindManyCooksFilters, { page }: PaginationParams) {
    const cooks = await prisma.user.findMany({
      where: {
        name: {
          contains: name
        },
        role: 'COOK'
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return cooks.map(PrismaCookMapper.toDomain)
  }

  async findAll() {
    const cooks = await prisma.user.findMany({
      where: {
        role: 'COOK'
      }
    })

    return cooks.map(PrismaCookMapper.toDomain)
  }

  async create(cook: Cook) {
    await prisma.user.create({
      data: PrismaCookMapper.toPrisma(cook)
    })
  }

  async save(cook: Cook) {
    await prisma.user.update({
      where: {
        id: cook.id.toString()
      },
      data: PrismaCookMapper.toPrisma(cook)
    })
  }

  async delete(cook: Cook) {
    await prisma.user.delete({
      where: {
        id: cook.id.toString()
      }
    })
  }
}
