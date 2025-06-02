import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import {
  Employee,
  EmployeeRole
} from '@/domain/app/enterprise/entities/employee'
import { Prisma, User as PrismaEmployee, UserRole } from 'generated/prisma'

export class PrismaEmployeeMapper {
  static toDomain(raw: PrismaEmployee): Employee {
    return Employee.create(
      {
        name: raw.name,
        username: unwrapOrFail(Username.create(raw.username)),
        passwordHash: raw.passwordHash,
        role: raw.role.toLowerCase() as EmployeeRole,
        createdAt: raw.createdAt
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(employee: Employee): Prisma.UserUncheckedCreateInput {
    return {
      id: employee.id.toString(),
      name: employee.name,
      username: employee.username.value,
      passwordHash: employee.passwordHash,
      role: employee.role.toUpperCase() as UserRole,
      createdAt: employee.createdAt
    }
  }
}
