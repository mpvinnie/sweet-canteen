import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderStatus } from '@/domain/app/enterprise/entities/order'
import { $Enums, Prisma, Order as PrismaOrder } from 'generated/prisma'

type PrismaOrderSummrary = PrismaOrder & {
  _count?: {
    orderItems: number
  }
  totalInCents?: number
}

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrderSummrary): Order {
    return Order.create(
      {
        attendantId: new UniqueEntityID(raw.attendantId),
        customerName: raw.customerName,
        orderItems: [],
        observation: raw.observation ?? undefined,
        status: raw.status.toLowerCase() as OrderStatus,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
        totalInCentsOverride: raw.totalInCents,
        totalItemsOverride: raw._count?.orderItems
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
      updatedAt: order.updatedAt
    }
  }
}
