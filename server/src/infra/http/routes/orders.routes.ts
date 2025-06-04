import { FastifyInstance } from 'fastify'
import { fetchOrders } from '../controllers/fetch-orders'
import { fetchTodayOrders } from '../controllers/fetch-today-orders'
import { getOrderById } from '../controllers/get-order-by-id'
import { registerOrder } from '../controllers/register-order'
import { ensurePermissions } from '../middlewares/ensure-permissions'

export async function ordersRoutes(app: FastifyInstance) {
  app.get(
    '/orders/history',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_orders']
        })
      ]
    },
    fetchOrders
  )
  app.get(
    '/orders/today',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_today_orders']
        })
      ]
    },
    fetchTodayOrders
  )
  app.get(
    '/orders/:orderId',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_orders']
        })
      ]
    },
    getOrderById
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
