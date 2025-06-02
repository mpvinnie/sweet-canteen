import { makeFetchEmployees } from '@/infra/factories/make-fetch-employees'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserPresenter } from '../presenters/user.presenter'

const fetchEmployeesQuerySchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).default(1)
})

export async function fetchEmployees(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, page } = fetchEmployeesQuerySchema.parse(request.query)

  const fetchEmployees = makeFetchEmployees()

  const result = await fetchEmployees.execute({
    name,
    page
  })

  if (result.isLeft()) {
    throw new Error()
  }

  const { employees } = result.value

  return reply.status(200).send({
    employees: employees.map(UserPresenter.toHTTP)
  })
}
