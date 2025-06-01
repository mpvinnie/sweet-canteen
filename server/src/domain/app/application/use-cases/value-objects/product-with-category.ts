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

  private touch() {
    this.props.updatedAt = new Date()
  }

  get productId() {
    return this.props.productId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  set priceInCents(priceInCents: number) {
    this.props.priceInCents = priceInCents
  }

  get availableQuantity() {
    return this.props.availableQuantity
  }

  set availableQuantity(availableQuantity: number) {
    this.props.availableQuantity = availableQuantity
  }

  get categoryId() {
    return this.props.categoryId
  }

  set categoryId(categoryId: UniqueEntityID) {
    this.props.categoryId = categoryId
  }

  get category() {
    return this.props.category
  }

  set category(category: string) {
    this.props.category = category
  }

  get available() {
    return this.props.available
  }

  set available(available: boolean) {
    this.props.available = available
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt
  }
}
