import { User } from '@/domain/app/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username.value,
      createdAt: user.createdAt,
      role: user.role
    }
  }
}
