import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderStatus } from '@/domain/app/enterprise/entities/order'
import { OrderItem } from '@/domain/app/enterprise/entities/orderItem'
import {
  $Enums,
  Prisma,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem
} from 'generated/prisma'

type PrismaOrderWithItems = PrismaOrder & {
  orderItems: PrismaOrderItem[]
}

export class PrismaOrderWithItemsMapper {
  static toDomain(raw: PrismaOrderWithItems): Order {
    const orderItems = raw.orderItems.map(item =>
      OrderItem.create(
        {
          orderId: new UniqueEntityID(item.orderId),
          productId: new UniqueEntityID(item.productId),
          productName: item.productName,
          quantity: item.quantity,
          unitPriceInCents: item.unitPriceInCents
        },
        new UniqueEntityID(item.id)
      )
    )

    return Order.create(
      {
        attendantId: new UniqueEntityID(raw.attendantId),
        customerName: raw.customerName,
        orderItems,
        observation: raw.observation ?? undefined,
        status: raw.status.toLowerCase() as OrderStatus,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      attendantId: order.attendantId.toString(),
      customerName: order.customerName,
      status: order.status.toUpperCase() as $Enums.OrderStatus,
      observation: order.observation,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderItems: {
        create: order.orderItems.map(item => ({
          id: item.id.toString(),
          productId: item.productId.toString(),
          productName: item.productName,
          quantity: item.quantity,
          unitPriceInCents: item.unitPriceInCents
        }))
      }
    }
  }
}
