import { MakeRegisterOrderUseCase } from '@/infra/factories/make-register-order'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerOrderBodySchema = z.object({
  customerName: z.string(),
  observation: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().min(0).default(1)
    })
  )
})

export async function registerOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const attendantId = request.user.sub

  const { customerName, observation, items } = registerOrderBodySchema.parse(
    request.body
  )

  const registerOrder = MakeRegisterOrderUseCase()

  const result = await registerOrder.execute({
    attendantId,
    customerName,
    observation,
    items
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'RESOURCE_NOT_FOUND':
        return reply.status(404).send({ message: error.message })
      case 'UNAVAILABLE_PRODUCT':
        return reply.status(409).send({ message: error.message })
      case 'INSUFICIENT_STOCK':
        return reply.status(409).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Bad request error.' })
    }
  }

  return reply.status(201).send()
}
