import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { User, UserProps } from './user'

export interface AdminProps extends UserProps {}

export class Admin extends User {
  static create(
    props: Omit<Optional<AdminProps, 'createdAt'>, 'role'>,
    id?: UniqueEntityID
  ) {
    const admin = new Admin(
      {
        ...props,
        role: 'admin',
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return admin
  }
}
