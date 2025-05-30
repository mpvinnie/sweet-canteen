import { FastifyInstance } from 'fastify'
import { authenticateAdmin } from './controllers/authenticate-admin'
import { verifyJWT } from './middlewares/jwt-verify'
import { authenticateAttendant } from './controllers/authenticate-attendant'
import { ensurePermissions } from './middlewares/ensure-permissions'
import { registerEmployee } from './controllers/register-employee'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateAdmin)
  app.post('/sessions/attendants', authenticateAttendant)

  app.post(
    '/employees',
    {
      preHandler: [
        verifyJWT,
        ensurePermissions({ permissions: ['register_employee'] })
      ]
    },
    registerEmployee
  )
}
