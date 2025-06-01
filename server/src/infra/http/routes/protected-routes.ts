import { FastifyInstance } from 'fastify'
import { fetchEmployees } from '../controllers/fetch-employees'
import { fetchProducts } from '../controllers/fetch-products'
import { getEmployeeById } from '../controllers/get-employee-profile'
import { getProductById } from '../controllers/get-product-by-id'
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
  app.get(
    '/employees',
    {
      preHandler: [ensurePermissions({ permissions: ['list_employees'] })]
    },
    fetchEmployees
  )
  app.get('/employees/me', getEmployeeById)
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
  app.get(
    '/products/:productId',
    {
      preHandler: [
        ensurePermissions({
          permissions: ['list_products']
        })
      ]
    },
    getProductById
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
