import { FastifyInstance } from 'fastify'
import { registerAttendant } from './controllers/register-attendant'
import { authenticateAdmin } from './controllers/authenticate-admin'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateAdmin)

  app.post('/users/attendants', registerAttendant)
}
