import { makeEditEmployeeUseCase } from '@/infra/factories/make-edit-employee'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmployeePresenter } from '../presenters/employee.presenter'

const editEmployeeParamsSchema = z.object({
  employeeId: z.string().uuid()
})

const editEmployeeBodySchema = z.object({
  name: z.string().optional(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]+$/, {
      message:
        'Username must contain only letters, numbers, underscores, dots or dashes'
    })
    .optional(),
  role: z.enum(['attendant', 'cook']).optional(),
  password: z.string().min(6).optional()
})

export async function editEmployee(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { employeeId } = editEmployeeParamsSchema.parse(request.params)
  const { name, username, role, password } = editEmployeeBodySchema.parse(
    request.body
  )

  const editEmployee = makeEditEmployeeUseCase()

  const result = await editEmployee.execute({
    employeeId,
    name,
    username,
    role,
    password
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.code) {
      case 'RESOURCE_NOT_FOUND':
        return reply.status(404).send({ message: error.message })
      case 'INVALID_USERNAME':
        return reply.status(400).send({ message: error.message })
      case 'USERNAME_ALREADY_TAKEN':
        return reply.status(409).send({ message: error.message })
      default:
        return reply.status(400).send({ message: 'Bad request error.' })
    }
  }

  return reply.status(200).send({
    employee: EmployeePresenter.toHTTP(result.value.employee)
  })
}
