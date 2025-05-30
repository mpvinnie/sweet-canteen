import { FastifyInstance } from 'fastify'
import { publicRoutes } from './public-routes'
import { protectedRoutes } from './protected-routes'

export async function appRoutes(app: FastifyInstance) {
  await app.register(publicRoutes)
  await app.register(protectedRoutes)
}
