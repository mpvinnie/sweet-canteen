import { makeGetOrderByIdUseCase } from '@/infra/factories/make-get-order-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrderWithItemsPresenter } from '../presenters/order-with-items.presenter'

const getOrderByIdParamsSchema = z.object({
  orderId: z.string().uuid()
})

export async function getOrderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { orderId } = getOrderByIdParamsSchema.parse(request.params)

  const getOrderById = makeGetOrderByIdUseCase()

  const result = await getOrderById.execute({
    orderId
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'RESOURCE_NOT_FOUND':
        return reply.status(404).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Resource not found.' })
    }
  }

  return reply.status(200).send({
    order: OrderWithItemsPresenter.toHTTP(result.value.order)
  })
}
