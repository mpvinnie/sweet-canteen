import { Order } from '@/domain/app/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      attendantId: order.attendantId.toString(),
      customerName: order.customerName,
      status: order.status,
      observation: order.observation,
      totalInCents: order.totalInCents,
      totalItems: order.totalItems,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }
  }
}
