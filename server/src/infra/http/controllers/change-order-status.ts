import { orderStatusArray } from '@/domain/app/enterprise/entities/order'
import { makeChangeOrderStatusUseCase } from '@/infra/factories/make-change-order-status'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrderPresenter } from '../presenters/order.presenter'

const changeOrderStatusParamsSchema = z.object({
  orderId: z.string().uuid()
})

const changeOrderStatusBodySchema = z.object({
  status: z.enum(orderStatusArray)
})

export async function changeOrderStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { orderId } = changeOrderStatusParamsSchema.parse(request.params)
  const { status } = changeOrderStatusBodySchema.parse(request.body)

  const changeOrderStatus = makeChangeOrderStatusUseCase()

  const result = await changeOrderStatus.execute({
    orderId,
    newStatus: status
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'RESOURCE_NOT_FOUND':
        return reply.status(404).send({ message: error.message })
      case 'INVALID_STATUS_TRANSITION':
        return reply.status(409).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Resource not found.' })
    }
  }

  return reply.status(200).send({
    order: OrderPresenter.toHTTP(result.value.order)
  })
}
