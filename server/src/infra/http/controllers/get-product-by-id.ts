import { makeGetProductByIdUseCase } from '@/infra/factories/make-get-product-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductWithCategoryPresenter } from '../presenters/product-with-category.presenter'

const getProductByIdParamsSchema = z.object({
  productId: z.string().uuid()
})

export async function getProductById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId } = getProductByIdParamsSchema.parse(request.params)

  const getProductById = makeGetProductByIdUseCase()

  const result = await getProductById.execute({
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

  return reply.status(200).send({
    product: ProductWithCategoryPresenter.toHTTP(result.value.product)
  })
}
