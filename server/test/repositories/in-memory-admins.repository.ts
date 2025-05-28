import { AdminsRepository } from '@/domain/app/application/repositories/admins.repository'
import { Admin } from '@/domain/app/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async findByUsername(username: string) {
    const admin = this.items.find(admin => admin.username.value === username)

    if (!admin) {
      return null
    }

    return admin
  }

  async create(admin: Admin) {
    this.items.push(admin)
  }
}
