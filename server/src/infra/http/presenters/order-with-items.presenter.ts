import { Order } from '@/domain/app/enterprise/entities/order'
import { OrderItemPresenter } from './order-item.presenter'

export class OrderWithItemsPresenter {
  static toHTTP(order: Order) {
    const orderItems = order.orderItems.map(OrderItemPresenter.toHTTP)

    return {
      id: order.id.toString(),
      attendantId: order.attendantId.toString(),
      customerName: order.customerName,
      status: order.status,
      observation: order.observation,
      totalInCents: order.totalInCents,
      totalItems: order.totalItems,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderItems
    }
  }
}
