import { Role } from '@/core/types/role'
import { OnlineUsersRepository } from '@/domain/realtime/application/repositories/online-users.repository'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'

export class InMemoryOnlineUsersRepository implements OnlineUsersRepository {
  public onlineUsers: Map<string, OnlineUser> = new Map()

  async add(onlineUser: OnlineUser) {
    this.onlineUsers.set(onlineUser.userId.toString(), onlineUser)
  }

  async removeByUserId(userId: string) {
    this.onlineUsers.delete(userId)
  }

  async getAllByRole(role: Role) {
    return Array.from(this.onlineUsers.values()).filter(
      item => item.role === role
    )
  }

  async getAll() {
    return Array.from(this.onlineUsers.values())
  }
}
