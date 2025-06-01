import { FastifyInstance } from 'fastify'
import { fetchEmployees } from '../controllers/fetch-employees'
import { getEmployeeById } from '../controllers/get-employee-profile'
import { registerEmployee } from '../controllers/register-employee'
import { ensurePermissions } from '../middlewares/ensure-permissions'

export async function employeesRoutes(app: FastifyInstance) {
  app.post(
    '/employees',
    {
      preHandler: [ensurePermissions({ permissions: ['register_employee'] })]
    },
    registerEmployee
  )
  app.get(
    '/employees',
    {
      preHandler: [ensurePermissions({ permissions: ['list_employees'] })]
    },
    fetchEmployees
  )
  app.get('/employees/me', getEmployeeById)
}
