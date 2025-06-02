import { FastifyInstance } from 'fastify'
import { deleteEmployee } from '../controllers/delete-employee'
import { editEmployee } from '../controllers/edit-employee'
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
  app.patch(
    '/employees/:employeeId',
    {
      preHandler: [ensurePermissions({ permissions: ['edit_employee'] })]
    },
    editEmployee
  )
  app.delete(
    '/employees/:id',
    {
      preHandler: [ensurePermissions({ permissions: ['delete_employee'] })]
    },
    deleteEmployee
  )
}
