import { makeRegisterAttendantUseCase } from '@/infra/factories/make-register-attendant'
import { makeRegisterCookUseCase } from '@/infra/factories/make-register-cook'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerEmployeeBodySchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]+$/, {
      message:
        'Username must contain only letters, numbers, underscores, dots or dashes'
    }),
  password: z.string(),
  role: z.enum(['attendant', 'cook'])
})

export async function registerEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, username, password, role } = registerEmployeeBodySchema.parse(
    request.body
  )

  let useCase

  switch (role) {
    case 'attendant':
      useCase = makeRegisterAttendantUseCase()
      break
    case 'cook':
      useCase = makeRegisterCookUseCase()
      break
    default:
      return reply.status(400).send({ message: 'Invalid role.' })
  }

  const result = await useCase.execute({
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
