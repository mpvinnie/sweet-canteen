import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Role } from '@/core/types/role'
import { User, UserProps } from './user'

export type EmployeeRole = Exclude<Role, 'admin'>

export interface EmployeeProps extends UserProps {
  role: EmployeeRole
}

export class Employee extends User {
  static create(
    props: Optional<EmployeeProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const employee = new Employee(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return employee
  }

  get role() {
    return this.props.role as EmployeeRole
  }

  updateRole(role: EmployeeRole) {
    this.props.role = role
  }
}
