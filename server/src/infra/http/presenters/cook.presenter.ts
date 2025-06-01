import { Cook } from '@/domain/app/enterprise/entities/cook'

export class CookPresenter {
  static toHTTP(cook: Cook) {
    return {
      id: cook.id.toString(),
      name: cook.name,
      username: cook.username.value,
      createdAt: cook.createdAt,
      role: cook.role
    }
  }
}
