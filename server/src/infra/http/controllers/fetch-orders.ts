import { makeFetchOrdersUseCase } from '@/infra/factories/make-fetch-orders'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrderPresenter } from '../presenters/order.presenter'

const fetchOrdersQuerySchema = z.object({
  attendantId: z.string().uuid().optional(),
  customerName: z.string().optional(),
  page: z.coerce.number().min(1).default(1)
})

export async function fetchOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { attendantId, customerName, page } = fetchOrdersQuerySchema.parse(
    request.query
  )

  const fetchOrders = makeFetchOrdersUseCase()

  const result = await fetchOrders.execute({
    attendantId,
    customerName,
    page
  })

  if (result.isLeft()) {
    throw new Error()
  }

  return reply.status(200).send({
    orders: result.value.orders.map(OrderPresenter.toHTTP)
  })
}
