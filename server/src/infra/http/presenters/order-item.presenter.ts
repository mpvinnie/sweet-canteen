import { OrderItem } from '@/domain/app/enterprise/entities/orderItem'

export class OrderItemPresenter {
  static toHTTP(orderItem: OrderItem) {
    return {
      id: orderItem.id.toString(),
      productName: orderItem.productName,
      quantity: orderItem.quantity
    }
  }
}
