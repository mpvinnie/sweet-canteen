import { makeDeleteEmployeeUseCase } from '@/infra/factories/make-delete-employee'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteEmployeeParamsSchema = z.object({
  id: z.string().uuid()
})

export async function deleteEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteEmployeeParamsSchema.parse(request.params)

  const deleteEmployee = makeDeleteEmployeeUseCase()

  const result = await deleteEmployee.execute({
    employeeId: id
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

  return reply.status(204).send()
}
