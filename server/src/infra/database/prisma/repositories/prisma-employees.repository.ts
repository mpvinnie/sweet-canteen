import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  EmployeesRepository,
  FindManyFilters
} from '@/domain/app/application/repositories/employees.repository'
import { Employee } from '@/domain/app/enterprise/entities/employee'
import { prisma } from '..'
import { PrismaEmployeeMapper } from '../mappers/prisma-employee.mapper'

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string) {
    const employee = await prisma.user.findUnique({
      where: {
        id,
        role: {
          not: 'ADMIN'
        }
      }
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findByUsername(username: string) {
    const employee = await prisma.user.findUnique({
      where: {
        username,
        role: {
          not: 'ADMIN'
        }
      }
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findMany({ name }: FindManyFilters, { page }: PaginationParams) {
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

    return employees.map(PrismaEmployeeMapper.toDomain)
  }

  async save(employee: Employee) {
    await prisma.user.update({
      where: {
        id: employee.id.toString()
      },
      data: PrismaEmployeeMapper.toPrisma(employee)
    })
  }
}
