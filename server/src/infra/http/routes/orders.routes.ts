import { FastifyInstance } from 'fastify'
import { fetchOrders } from '../controllers/fetch-orders'
import { registerOrder } from '../controllers/register-order'
import { ensurePermissions } from '../middlewares/ensure-permissions'

export async function ordersRoutes(app: FastifyInstance) {
  app.get(
    '/orders',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_orders']
        })
      ]
    },
    fetchOrders
  )
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
