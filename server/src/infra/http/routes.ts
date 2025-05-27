import { FastifyInstance } from 'fastify'
import { registerAttendant } from './controllers/register-attendant'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users/attendants', registerAttendant)
}
