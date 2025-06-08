import uploadConfig from '@/core/config/upload'
import { makeRegisterProductUseCase } from '@/infra/factories/make-register-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { z } from 'zod'

const registerProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  priceInCents: z.coerce.number().min(0),
  availableQuantity: z.coerce.number().min(0).default(0),
  categoryName: z.string()
})

export async function registerProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parts = request.parts()

  const body: Record<string, string> = {}
  let uploadedFileName: string | null = null

  for await (const part of parts) {
    if (part.type === 'file') {
      const fileName = uploadConfig.generateFileName(part.filename)
      const filePath = path.resolve(uploadConfig.tmpFolder, fileName)

      await pipeline(part.file, fs.createWriteStream(filePath))

      uploadedFileName = fileName
    } else if (part.type === 'field') {
      body[part.fieldname] = String(part.value)
    }
  }

  const { name, description, priceInCents, availableQuantity, categoryName } =
    registerProductBodySchema.parse(body)

  const registerProduct = makeRegisterProductUseCase()

  await registerProduct.execute({
    name,
    description,
    priceInCents,
    availableQuantity,
    categoryName,
    imageFilename: uploadedFileName!
  })

  return reply.status(201).send()
}
