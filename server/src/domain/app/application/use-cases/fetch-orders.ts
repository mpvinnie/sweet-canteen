import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders.repository'

interface FetchOrdersUseCaseRequest {
  attendantId?: string
  customerName?: string
  page: number
}

type FetchOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

export class FetchOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    attendantId,
    customerName,
    page
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findMany(
      { attendantId, customerName },
      { page }
    )

    return right({ orders })
  }
}
