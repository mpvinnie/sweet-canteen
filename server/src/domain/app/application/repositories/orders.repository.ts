import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order, OrderStatus } from '../../enterprise/entities/order'

export interface FindManyOrdersFilters {
  attendantId?: string
  customerName?: string
  status?: OrderStatus
  date?: {
    from: Date
    to: Date
  }
}

export interface OrdersRepository {
  findMany(
    filters: FindManyOrdersFilters,
    params: PaginationParams
  ): Promise<Order[]>
  findById(orderId: string): Promise<Order | null>
  create(order: Order): Promise<void>
  delete(order: Order): Promise<void>
  save(order: Order): Promise<void>
}
