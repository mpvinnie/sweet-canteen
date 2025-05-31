import { OrderItemsRepository } from '@/domain/app/application/repositories/orderItems.repository'
import { prisma } from '..'

export class PrismaOrderItemsRepository implements OrderItemsRepository {
  async deleteManyByOrderId(orderId: string) {
    await prisma.orderItem.deleteMany({
      where: {
        orderId
      }
    })
  }
}
