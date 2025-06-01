import { makeAuthenticateUserUseCase } from '@/infra/factories/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateUserBodySchema = z.object({
  username: z.string(),
  password: z.string()
})

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = authenticateUserBodySchema.parse(request.body)

  const authenticateUser = makeAuthenticateUserUseCase()

  const result = await authenticateUser.execute({
    username,
    password
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'WRONG_CREDENTIALS':
        return reply.status(403).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Bad request error.' })
    }
  }

  const { payload } = result.value

  const token = await reply.jwtSign(
    {
      role: payload.role
    },
    {
      sign: {
        sub: payload.userId
      }
    }
  )

  return reply.status(200).send({
    token
  })
}
