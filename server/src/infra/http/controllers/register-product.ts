import { makeRegisterProductUseCase } from '@/infra/factories/make-register-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  priceInCents: z.number().min(0),
  availableQuantity: z.number().min(0).default(0),
  categoryName: z.string()
})

export async function registerProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, description, priceInCents, availableQuantity, categoryName } =
    registerProductBodySchema.parse(request.body)

  const registerProduct = makeRegisterProductUseCase()

  await registerProduct.execute({
    name,
    description,
    priceInCents,
    availableQuantity,
    categoryName
  })

  return reply.status(201).send()
}
