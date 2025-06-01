import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/jwt-verify'
import { employeesRoutes } from './employees.routes'
import { productsRoutes } from './products.routes'

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  await app.register(employeesRoutes)
  await app.register(productsRoutes)
}
