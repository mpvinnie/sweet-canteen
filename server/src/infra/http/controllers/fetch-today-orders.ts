import { orderStatusArray } from '@/domain/app/enterprise/entities/order'
import { makeFetchTodayOrdersUseCase } from '@/infra/factories/make-fetch-today-orders'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrderWithItemsPresenter } from '../presenters/order-with-items.presenter'

const fetchTodayOrdersQuerySchema = z.object({
  attendantId: z.string().uuid().optional(),
  customerName: z.string().optional(),
  status: z.enum(orderStatusArray).optional(),
  page: z.coerce.number().min(1).default(1)
})

export async function fetchTodayOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { attendantId, customerName, status, page } =
    fetchTodayOrdersQuerySchema.parse(request.query)

  const fetchTodayOrders = makeFetchTodayOrdersUseCase()

  const result = await fetchTodayOrders.execute({
    attendantId,
    customerName,
    status,
    page
  })

  if (result.isLeft()) {
    throw new Error()
  }

  return reply.status(200).send({
    orders: result.value.orders.map(OrderWithItemsPresenter.toHTTP)
  })
}
