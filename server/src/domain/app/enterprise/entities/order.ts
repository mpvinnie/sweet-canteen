import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderCreatedEvent } from '../events/order-created.event'
import { OrderStatusUpdated } from '../events/order-status-updated.event'
import { OrderItem } from './orderItem'

export const orderStatusArray = [
  'pending',
  'processing',
  'on_hold',
  'canceled',
  'finished',
  'completed'
] as const

export type OrderStatus = (typeof orderStatusArray)[number]

export interface OrderProps {
  attendantId: UniqueEntityID
  customerName: string
  status: OrderStatus
  observation?: string
  orderItems: OrderItem[]
  createdAt: Date
  updatedAt?: Date
  totalInCentsOverride?: number
  totalItemsOverride?: number
}

export class Order extends AggregateRoot<OrderProps> {
  static create(
    props: Optional<OrderProps, 'status' | 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'pending',
        createdAt: props.createdAt ?? new Date(),
        totalInCentsOverride: props.totalInCentsOverride,
        totalItemsOverride: props.totalItemsOverride
      },
      id
    )

    const isNewOrder = !id

    if (isNewOrder) {
      order.addDomainEvent(new OrderCreatedEvent(order))
    }

    return order
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get attendantId() {
    return this.props.attendantId
  }

  get customerName() {
    return this.props.customerName
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    if (this.props.status === status) {
      return
    }

    this.props.status = status
    this.touch()

    this.addDomainEvent(new OrderStatusUpdated(this))
  }

  get observation() {
    return this.props.observation
  }

  get orderItems() {
    return this.props.orderItems
  }

  set orderItems(orderItems: OrderItem[]) {
    this.props.orderItems = orderItems
  }

  get totalInCents() {
    return (
      this.props.totalInCentsOverride ??
      this.props.orderItems.reduce((total, item) => {
        return total + item.subtotalInCents
      }, 0)
    )
  }

  get totalItems() {
    return this.props.totalItemsOverride ?? this.props.orderItems.length
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
