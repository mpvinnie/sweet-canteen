import { FastifyInstance } from 'fastify'
import { registerAttendant } from './controllers/register-attendant'
import { authenticateAdmin } from './controllers/authenticate-admin'
import { verifyJWT } from './middlewares/jwt-verify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateAdmin)

  app.post('/users/attendants', { onRequest: [verifyJWT] }, registerAttendant)
}
