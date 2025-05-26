import { UsersRepository } from '@/domain/app/application/repositories/users.repository'
import { User } from '@/domain/app/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find(item => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)
  }
}
