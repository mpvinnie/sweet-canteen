import { Attendant } from '@/domain/app/enterprise/entities/attendant'

export class AttendantPresenter {
  static toHTTP(attendant: Attendant) {
    return {
      id: attendant.id.toString(),
      name: attendant.name,
      username: attendant.username.value,
      createdAt: attendant.createdAt,
      role: attendant.role
    }
  }
}
