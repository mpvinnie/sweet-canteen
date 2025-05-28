import { Either, left, right } from '@/core/either'
import { Order, OrderStatus } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders.repository'
import { canTransition } from '../../enterprise/entities/order-status-transitions'
import { InvalidStatusTransition } from './errors/invalid-status-transition.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface ChangeOrderStatusUseCaseRequest {
  orderId: string
  newStatus: OrderStatus
}

type ChangeOrderStatusUseCaseResponse = Either<
  ResourceNotFoundError | InvalidStatusTransition,
  {
    order: Order
  }
>

export class ChangeOrderStatusUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    newStatus
  }: ChangeOrderStatusUseCaseRequest): Promise<ChangeOrderStatusUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (!canTransition(order.status, newStatus)) {
      return left(new InvalidStatusTransition(order.status, newStatus))
    }

    order.status = newStatus

    await this.ordersRepository.save(order)

    return right({ order })
  }
}
