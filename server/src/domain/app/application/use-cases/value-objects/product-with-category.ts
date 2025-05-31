import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface ProductWithCategoryProps {
  productId: UniqueEntityID
  name: string
  description: string
  priceInCents: number
  availableQuantity: number
  categoryId: UniqueEntityID
  category: string
  available: boolean
  createdAt: Date
  updatedAt?: Date
}

export class ProductWithCategory extends ValueObject<ProductWithCategoryProps> {
  static create(props: ProductWithCategoryProps) {
    return new ProductWithCategory(props)
  }

  get productId() {
    return this.props.productId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get availableQuantity() {
    return this.props.availableQuantity
  }

  get categoryId() {
    return this.props.categoryId
  }

  get category() {
    return this.props.category
  }

  get available() {
    return this.props.available
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
