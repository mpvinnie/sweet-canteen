import { makeEditProductUseCase } from '@/infra/factories/make-edit-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductWithCategoryPresenter } from '../presenters/product-with-category.presenter'

const editProductParamsSchema = z.object({
  productId: z.string().uuid()
})

const editProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  priceInCents: z.number(),
  available: z.boolean(),
  availableQuantity: z.number().min(0),
  categoryName: z.string()
})

export async function editProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId } = editProductParamsSchema.parse(request.params)

  const {
    name,
    description,
    priceInCents,
    available,
    availableQuantity,
    categoryName
  } = editProductBodySchema.parse(request.body)

  const editProduct = makeEditProductUseCase()

  const result = await editProduct.execute({
    productId,
    name,
    description,
    priceInCents,
    available,
    availableQuantity,
    categoryName
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
