import { unwrapOrFail } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Username } from '@/domain/app/application/use-cases/value-objects/username'
import {
  Employee,
  EmployeeProps
} from '@/domain/app/enterprise/entities/employee'
import { faker } from '@faker-js/faker'

export function makeEmployee(
  override: Partial<EmployeeProps> = {},
  id?: UniqueEntityID
) {
  const usernameCreated = unwrapOrFail(
    Username.create(faker.internet.username())
  )

  const employee = Employee.create(
    {
      name: faker.person.fullName(),
      username: usernameCreated,
      passwordHash: faker.internet.password(),
      role: 'attendant',
      ...override
    },
    id
  )

  return employee
}
