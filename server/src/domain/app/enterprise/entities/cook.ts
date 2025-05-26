import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { User, UserProps } from './user'

export interface CookProps extends UserProps {}

export class Cook extends User {
  static create(
    props: Omit<Optional<CookProps, 'createdAt'>, 'role'>,
    id?: UniqueEntityID
  ) {
    const cook = new Cook(
      {
        ...props,
        role: 'cook',
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return cook
  }
}
