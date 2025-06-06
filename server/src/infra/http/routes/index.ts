import { FastifyInstance } from 'fastify'
import { protectedRoutes } from './protected-routes'
import { publicRoutes } from './public-routes'

export async function appRoutes(app: FastifyInstance) {
  await app.register(publicRoutes)
  await app.register(protectedRoutes)
}
