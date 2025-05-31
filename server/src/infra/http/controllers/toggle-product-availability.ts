import { makeToggleProductAvailability } from '@/infra/factories/make-toggle-product-availability'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const toggleProductAvailabilityParamsSchema = z.object({
  productId: z.string().uuid()
})

export async function toggleProductAvailability(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId } = toggleProductAvailabilityParamsSchema.parse(
    request.params
  )

  const toggleProductAvailability = makeToggleProductAvailability()

  const result = await toggleProductAvailability.execute({
    productId
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'RESOURCE_NOT_FOUND':
        return reply.status(404).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Bad request error.' })
    }
  }

  return reply.status(204).send()
}
