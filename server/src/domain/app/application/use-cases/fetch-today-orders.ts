import { Either, right } from '@/core/either'
import { Order, OrderStatus } from '../../enterprise/entities/order'
import { DateProvider } from '../providers/date.provider'
import { OrdersRepository } from '../repositories/orders.repository'

interface FetchTodayOrdersUseCaseRequest {
  attendantId?: string
  customerName?: string
  status?: OrderStatus
  page: number
}

type FetchTodayOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

export class FetchTodayOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private dateProvider: DateProvider
  ) {}

  async execute({
    attendantId,
    customerName,
    status,
    page
  }: FetchTodayOrdersUseCaseRequest): Promise<FetchTodayOrdersUseCaseResponse> {
    const now = this.dateProvider.dateNow()

    const orders = await this.ordersRepository.findManyWithItems(
      {
        attendantId,
        customerName,
        status,
        date: {
          from: this.dateProvider.startOfDay(now),
          to: this.dateProvider.endOfDay(now)
        }
      },
      { page }
    )

    return right({ orders })
  }
}
