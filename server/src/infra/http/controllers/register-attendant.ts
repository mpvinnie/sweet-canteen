import { makeRegisterAttendantUseCase } from '@/infra/factories/make-register-attendant'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerAttendantBodySchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]+$/, {
      message:
        'Username must contain only letters, numbers, underscores, dots or dashes'
    }),
  password: z.string()
})

export async function registerAttendant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, username, password } = registerAttendantBodySchema.parse(
    request.body
  )

  const registerAttendant = makeRegisterAttendantUseCase()

  const result = await registerAttendant.execute({
    name,
    username,
    password
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'USERNAME_ALREADY_TAKEN':
        return reply.status(409).send({ message: error.message })
      case 'INVALID_USERNAME':
        return reply.status(400).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Bad request error.' })
    }
  }

  return reply.status(201).send()
}
