import { makeDeleteOrderUseCase } from '@/infra/factories/make-delete-order'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteOrderParamsSchema = z.object({
  orderId: z.string().uuid()
})

export async function deleteOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { orderId } = deleteOrderParamsSchema.parse(request.params)

  const deleteOrder = makeDeleteOrderUseCase()

  const result = await deleteOrder.execute({
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

  return reply.status(204).send()
}
