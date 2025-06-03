import { FastifyInstance } from 'fastify'
import { getUserProfile } from '../controllers/get-user-profile'
import { verifyJWT } from '../middlewares/jwt-verify'
import { employeesRoutes } from './employees.routes'
import { ordersRoutes } from './orders.routes'
import { productsRoutes } from './products.routes'

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  app.get('/users/me', getUserProfile)

  await app.register(employeesRoutes)
  await app.register(productsRoutes)
  await app.register(ordersRoutes)
}
