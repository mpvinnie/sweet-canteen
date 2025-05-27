import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  name: string
  description: string
  priceInCents: number
  available: boolean
  availableQuantity: number
  categoryId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  static create(
    props: Optional<ProductProps, 'available' | 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const product = new Product(
      {
        ...props,
        available: props.available ?? false,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return product
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  set priceInCents(priceInCents: number) {
    this.props.priceInCents = priceInCents
    this.touch()
  }

  get available() {
    return this.props.available
  }

  set available(available: boolean) {
    this.props.available = available
    this.touch()
  }

  get availableQuantity() {
    return this.props.availableQuantity
  }

  set availableQuantity(availableQuantity: number) {
    if (availableQuantity === 0) {
      this.props.available = false
    }

    this.props.availableQuantity = availableQuantity
    this.touch()
  }

  get categoryId() {
    return this.props.categoryId
  }

  set categoryId(categoryId: UniqueEntityID) {
    this.props.categoryId = categoryId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
