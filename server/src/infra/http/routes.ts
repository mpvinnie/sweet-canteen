import { FastifyInstance } from 'fastify'
import { registerAttendant } from './controllers/register-attendant'
import { authenticateAdmin } from './controllers/authenticate-admin'
import { verifyJWT } from './middlewares/jwt-verify'
import { authenticateAttendant } from './controllers/authenticate-attendant'
import { ensurePermissions } from './middlewares/ensure-permissions'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateAdmin)
  app.post('/sessions/attendants', authenticateAttendant)

  app.post(
    '/users/attendants',
    {
      preHandler: [
        verifyJWT,
        ensurePermissions({ permissions: ['register_attendant'] })
      ]
    },
    registerAttendant
  )
}
