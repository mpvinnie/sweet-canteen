import { OrderItemsRepository } from '@/domain/app/application/repositories/orderItems.repository'
import { OrderItem } from '@/domain/app/enterprise/entities/orderItem'

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItem[] = []

  async deleteManyByOrderId(orderId: string) {
    const orderItems = this.items.filter(
      orderItem => orderItem.orderId.toString() !== orderId
    )

    this.items = orderItems
  }
}
