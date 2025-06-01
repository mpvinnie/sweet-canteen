import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyEmployeesFilters,
  UsersRepository
} from '@/domain/app/application/repositories/users.repository'
import { User } from '@/domain/app/enterprise/entities/user'
import { prisma } from '..'
import { PrismaUserMapper } from '../mappers/prisma-user.mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findManyEmployees(
    { name }: FindManyEmployeesFilters,
    { page }: PaginationParams
  ) {
    const employees = await prisma.user.findMany({
      where: {
        role: {
          not: 'ADMIN'
        },
        name: {
          contains: name
        }
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return employees.map(PrismaUserMapper.toDomain)
  }

  async create(user: User) {
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user)
    })
  }

  async delete(user: User) {
    await prisma.user.delete({
      where: {
        id: user.id.toString()
      }
    })
  }
}
