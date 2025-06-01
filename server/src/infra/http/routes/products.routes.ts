import { FastifyInstance } from 'fastify'
import { fetchProducts } from '../controllers/fetch-products'
import { getProductById } from '../controllers/get-product-by-id'
import { registerProduct } from '../controllers/register-product'
import { toggleProductAvailability } from '../controllers/toggle-product-availability'
import { ensurePermissions } from '../middlewares/ensure-permissions'

export async function productsRoutes(app: FastifyInstance) {
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
