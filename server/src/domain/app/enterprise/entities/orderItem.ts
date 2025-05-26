import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface OrderItemProps {
  orderId: UniqueEntityID
  productId: UniqueEntityID
  productName: string
  quantity: number
  unitPriceInCents: number
}

export class OrderItem extends Entity<OrderItemProps> {
  static create(props: OrderItemProps, id?: UniqueEntityID) {
    const orderItem = new OrderItem(props, id)

    return orderItem
  }

  get orderId() {
    return this.props.orderId
  }

  get productId() {
    return this.props.productId
  }

  get productName() {
    return this.props.productName
  }

  get quantity() {
    return this.props.quantity
  }

  get unitPriceInCents() {
    return this.props.unitPriceInCents
  }

  get subtotalInCents() {
    return this.props.unitPriceInCents * this.props.quantity
  }
}
