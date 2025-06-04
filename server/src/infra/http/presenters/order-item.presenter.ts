import { OrderItem } from '@/domain/app/enterprise/entities/orderItem'

export class OrderItemPresenter {
  static toHTTP(orderItem: OrderItem) {
    return {
      id: orderItem.id.toString(),
      productId: orderItem.productId.toString(),
      productName: orderItem.productName,
      quantity: orderItem.quantity,
      unitPriceInCents: orderItem.unitPriceInCents,
      subtotalInCents: orderItem.subtotalInCents
    }
  }
}
