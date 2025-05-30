import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middlewares/jwt-verify'
import { ensurePermissions } from './middlewares/ensure-permissions'
import { registerEmployee } from './controllers/register-employee'
import { authenticateUser } from './controllers/authenticate-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUser)

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
