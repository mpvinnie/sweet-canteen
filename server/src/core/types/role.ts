import { Permission } from './permission'

export type Role = 'admin' | 'attendant' | 'cook'

export const RolePermissions: Record<Role, Permission[]> = {
  admin: [
    'register_product',
    'edit_product',
    'delete_product',
    'list_products',
    'list_orders'
  ],
  attendant: ['register_order', 'list_products', 'list_orders'],
  cook: ['list_orders', 'update_order_status']
}
