import { FastifyInstance } from 'fastify'
import { fetchProducts } from '../controllers/fetch-products'
import { registerEmployee } from '../controllers/register-employee'
import { registerProduct } from '../controllers/register-product'
import { toggleProductAvailability } from '../controllers/toggle-product-availability'
import { ensurePermissions } from '../middlewares/ensure-permissions'
import { verifyJWT } from '../middlewares/jwt-verify'

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
  app.get(
    '/products',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_products']
        })
      ]
    },
    fetchProducts
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
