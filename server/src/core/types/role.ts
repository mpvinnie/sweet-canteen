import { Permission } from './permission'

export type Role = 'admin' | 'attendant' | 'cook'

export const RolePermissions: Record<Role, Permission[]> = {
  admin: [
    'register_employee',
    'register_product',
    'edit_product',
    'edit_employee',
    'delete_product',
    'delete_employee',
    'list_employees',
    'list_products',
    'list_orders'
  ],
  attendant: ['register_order', 'list_products', 'list_orders'],
  cook: ['list_orders', 'update_order_status']
}
