import { RolePermissions } from '@/core/types/role'
import { makeAuthenticateAttendantUseCase } from '@/infra/factories/make-authenticate-attendant'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateAttendantBodySchema = z.object({
  username: z.string(),
  password: z.string()
})

export async function authenticateAttendant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = authenticateAttendantBodySchema.parse(
    request.body
  )

  const authenticateAttendant = makeAuthenticateAttendantUseCase()

  const result = await authenticateAttendant.execute({
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

  const permissions = RolePermissions[payload.role]

  const token = await reply.jwtSign(
    {
      role: payload.role,
      permissions
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
