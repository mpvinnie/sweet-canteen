import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/app/enterprise/entities/order'
import { OrderItem } from '@/domain/app/enterprise/entities/orderItem'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID
) {
  const order = Order.create(
    {
      attendantId: new UniqueEntityID(),
      customerName: faker.person.fullName(),
      orderItems: [],
      ...override
    },
    id
  )

  const orderItems: OrderItem[] = [
    OrderItem.create({
      orderId: id ?? order.id,
      productId: new UniqueEntityID(),
      productName: faker.food.dish(),
      quantity: 2,
      unitPriceInCents: 1000
    })
  ]

  order.orderItems = orderItems

  return order
}
