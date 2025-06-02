import { makeDeleteProductUseCase } from '@/infra/factories/make-delete-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteProductParamsSchema = z.object({
  productId: z.string().uuid()
})

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId } = deleteProductParamsSchema.parse(request.params)

  const deleteProduct = makeDeleteProductUseCase()

  const result = await deleteProduct.execute({
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
