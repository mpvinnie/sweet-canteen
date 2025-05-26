import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CategoryProps {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Category extends Entity<CategoryProps> {
  static create(
    props: Optional<CategoryProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const category = new Category(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return category
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
