import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderItemsRepository } from '@/domain/app/application/repositories/orderItems.repository'
import {
  FindManyOrdersFilters,
  OrdersRepository
} from '@/domain/app/application/repositories/orders.repository'
import { Order } from '@/domain/app/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(private orderItemsRepository: OrderItemsRepository) {}

  async findMany(
    { attendantId, customerName, status, date }: FindManyOrdersFilters,
    { page }: PaginationParams
  ) {
    const filteredOrders = this.items
      .filter(order => {
        if (attendantId && order.attendantId.toString() !== attendantId) {
          return false
        }

        if (
          customerName &&
          !order.customerName.toLowerCase().includes(customerName.toLowerCase())
        ) {
          return false
        }

        if (status && order.status !== status) {
          return false
        }

        if (
          date &&
          !(order.createdAt >= date.from && order.createdAt <= date.to)
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredOrders
  }

  async findManyWithItems(
    { attendantId, customerName, status, date }: FindManyOrdersFilters,
    { page }: PaginationParams
  ) {
    const filteredOrders = this.items
      .filter(order => {
        if (attendantId && order.attendantId.toString() !== attendantId) {
          return false
        }

        if (
          customerName &&
          !order.customerName.toLowerCase().includes(customerName.toLowerCase())
        ) {
          return false
        }

        if (status && order.status !== status) {
          return false
        }

        if (
          date &&
          !(order.createdAt >= date.from && order.createdAt <= date.to)
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return filteredOrders
  }

  async findById(orderId: string) {
    const order = this.items.find(order => order.id.toString() === orderId)

    if (!order) {
      return null
    }

    return order
  }

  async create(order: Order) {
    this.items.push(order)

    DomainEvents.dispatchEventsForAggregate(order.id)
  }

  async delete(order: Order) {
    const itemIndex = this.items.findIndex(item => item.id === order.id)

    this.items.splice(itemIndex, 1)

    this.orderItemsRepository.deleteManyByOrderId(order.id.toString())
  }

  async save(order: Order) {
    const orderIndex = this.items.findIndex(item => item.id === order.id)

    this.items[orderIndex] = order

    DomainEvents.dispatchEventsForAggregate(order.id)
  }
}
