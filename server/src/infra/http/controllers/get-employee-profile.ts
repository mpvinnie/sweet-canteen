import { makeGetAttendantByIdUseCase } from '@/infra/factories/make-get-attendent-by-id'
import { makeGetCookByIdUseCase } from '@/infra/factories/make-get-cook-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AttendantPresenter } from '../presenters/attendant.presenter'
import { CookPresenter } from '../presenters/cook.presenter'

export async function getEmployeeById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: id, role } = request.user

  const map = {
    attendant: {
      useCaseFactory: makeGetAttendantByIdUseCase,
      presenter: AttendantPresenter.toHTTP,
      key: 'attendant' as const
    },
    cook: {
      useCaseFactory: makeGetCookByIdUseCase,
      presenter: CookPresenter.toHTTP,
      key: 'cook' as const
    }
  } as const

  const selected = map[role as keyof typeof map]

  if (!selected) {
    return reply.status(403).send({ message: 'Unauthorized access.' })
  }

  const useCase = selected.useCaseFactory()
  const result = await useCase.execute({
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

  if ('attendant' in result.value) {
    return reply.status(200).send({
      employee: AttendantPresenter.toHTTP(result.value.attendant)
    })
  }

  return reply.status(200).send({
    employee: CookPresenter.toHTTP(result.value.cook)
  })
}
