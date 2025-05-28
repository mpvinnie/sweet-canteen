import { Admin } from '../../enterprise/entities/admin'

export interface AdminsRepository {
  findByUsername(username: string): Promise<Admin | null>
  create(admin: Admin): Promise<void>
}
