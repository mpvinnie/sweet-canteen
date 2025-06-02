import { makeGetUserProfileUseCase } from '@/infra/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '../presenters/user.presenter'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: id } = request.user

  const getUserProfile = makeGetUserProfileUseCase()

  const result = await getUserProfile.execute({
    id
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
    user: UserPresenter.toHTTP(result.value.user)
  })
}
