import { Role } from '@/core/types/role'
import { OnlineUser } from '../../enterprise/entities/online-user'

export interface OnlineUsersRepository {
  add(onlineUser: OnlineUser): Promise<void>
  removeByUserId(userId: string): Promise<void>
  getAllByRole(role: Role): Promise<OnlineUser[]>
  getAll(): Promise<OnlineUser[]>
}
