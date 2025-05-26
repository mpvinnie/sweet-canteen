import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { User, UserProps } from './user'

export interface AttendantProps extends UserProps {}

export class Attendant extends User {
  static create(
    props: Omit<Optional<AttendantProps, 'createdAt'>, 'role'>,
    id?: UniqueEntityID
  ) {
    const attendant = new Attendant(
      {
        ...props,
        role: 'attendant',
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return attendant
  }
}
