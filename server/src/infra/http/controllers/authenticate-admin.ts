import { RolePermissions } from '@/core/types/role'
import { makeAuthenticateAdminUseCase } from '@/infra/factories/make-authenticate-admin'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateAdminBodySchema = z.object({
  username: z.string(),
  password: z.string()
})

export async function authenticateAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = authenticateAdminBodySchema.parse(request.body)

  const authenticateAdmin = makeAuthenticateAdminUseCase()

  const result = await authenticateAdmin.execute({
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
