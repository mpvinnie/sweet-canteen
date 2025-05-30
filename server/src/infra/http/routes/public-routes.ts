import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../controllers/authenticate-user'

export async function publicRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUser)
}
