import { User } from '@/domain/app/enterprise/entities/user'

export class EmployeePresenter {
  static toHTTP(employee: User) {
    return {
      id: employee.id.toString(),
      name: employee.name,
      username: employee.username.value,
      createdAt: employee.createdAt,
      role: employee.role
    }
  }
}
