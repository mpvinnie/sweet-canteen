import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyOrdersFilters,
  OrdersRepository
} from '@/domain/app/application/repositories/orders.repository'
import { Order } from '@/domain/app/enterprise/entities/order'
import { $Enums } from 'generated/prisma'
import { prisma } from '..'
import { PrismaOrderWithItemsMapper } from '../mappers/prisma-order-with-items.mapper'
import { PrismaOrderMapper } from '../mappers/prisma-order.mapper'

export class PrismaOrdersRepository implements OrdersRepository {
  async findMany(
    { attendantId, customerName, status, date }: FindManyOrdersFilters,
    { page }: PaginationParams
  ) {
    const orders = await prisma.order.findMany({
      where: {
        attendantId,
        customerName: {
          contains: customerName,
          mode: 'insensitive'
        },
        status: (status?.toUpperCase() as $Enums.OrderStatus) || undefined,
        createdAt: {
          gte: date?.from,
          lte: date?.to
        }
      },
      skip: (page - 1) * 20,
      take: 20,
      select: {
        id: true,
        attendantId: true,
        customerName: true,
        observation: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            orderItems: true
          }
        },
        orderItems: {
          select: {
            quantity: true,
            unitPriceInCents: true
          }
        }
      }
    })

    return orders.map(raw => {
      const totalInCents = raw.orderItems.reduce((total, item) => {
        return total + item.quantity * item.unitPriceInCents
      }, 0)

      return PrismaOrderMapper.toDomain({
        ...raw,
        totalInCents
      })
    })
  }

  async findManyWithItems(
    { attendantId, customerName, status, date }: FindManyOrdersFilters,
    { page }: PaginationParams
  ) {
    const orders = await prisma.order.findMany({
      where: {
        attendantId,
        customerName: {
          contains: customerName,
          mode: 'insensitive'
        },
        status: (status?.toUpperCase() as $Enums.OrderStatus) || undefined,
        createdAt: {
          gte: date?.from,
          lte: date?.to
        }
      },
      skip: (page - 1) * 20,
      take: 20,
      include: {
        orderItems: true
      }
    })

    return orders.map(PrismaOrderWithItemsMapper.toDomain)
  }

  async findById(orderId: string) {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      }
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async create(order: Order) {
    await prisma.order.create({
      data: PrismaOrderWithItemsMapper.toPrisma(order)
    })
  }

  async delete(order: Order) {
    await prisma.order.delete({
      where: {
        id: order.id.toString()
      }
    })
  }

  async save(order: Order) {
    await prisma.order.update({
      where: {
        id: order.id.toString()
      },
      data: PrismaOrderMapper.toPrisma(order)
    })
  }
}
