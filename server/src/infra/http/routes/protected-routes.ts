import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/jwt-verify'
import { ensurePermissions } from '../middlewares/ensure-permissions'
import { registerEmployee } from '../controllers/register-employee'
import { registerProduct } from '../controllers/register-product'
import { toggleProductAvailability } from '../controllers/toggle-product-availability'

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  app.post(
    '/employees',
    {
      preHandler: [ensurePermissions({ permissions: ['register_employee'] })]
    },
    registerEmployee
  )
  app.post(
    '/products',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['register_product']
        })
      ]
    },
    registerProduct
  )
  app.put(
    '/products/:productId',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['edit_product']
        })
      ]
    },
    toggleProductAvailability
  )
}
