import { makeFetchProductsUseCase } from '@/infra/factories/make-fetch-products'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductWithCategoryPresenter } from '../presenters/product-with-category.presenter'
import { optionalBooleanParam } from '../validations/optional-boolean-param'

const fetchProductsBodySchema = z.object({
  name: z.string().optional(),
  available: optionalBooleanParam(),
  categoryId: z.string().uuid().optional(),
  page: z.coerce.number().min(1).default(1)
})

export async function fetchProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, available, categoryId, page } = fetchProductsBodySchema.parse(
    request.query
  )

  const fetchProducts = makeFetchProductsUseCase()

  const result = await fetchProducts.execute({
    name,
    available,
    categoryId,
    page
  })

  if (result.isLeft()) {
    throw new Error()
  }

  const { products } = result.value

  return reply.status(200).send({
    products: products.map(ProductWithCategoryPresenter.toHTTP)
  })
}
