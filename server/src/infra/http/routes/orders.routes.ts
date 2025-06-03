import { FastifyInstance } from 'fastify'
import { registerOrder } from '../controllers/register-order'
import { ensurePermissions } from '../middlewares/ensure-permissions'

export async function ordersRoutes(app: FastifyInstance) {
  app.post(
    '/orders',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['register_order']
        })
      ]
    },
    registerOrder
  )
}
