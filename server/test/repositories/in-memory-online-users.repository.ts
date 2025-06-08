import { Role } from '@/core/types/role'
import { OnlineUsersRepository } from '@/domain/realtime/application/repositories/online-users.repository'
import { OnlineUser } from '@/domain/realtime/application/use-cases/value-objects/online-user'

export class InMemoryOnlineUsersRepository implements OnlineUsersRepository {
  public onlineUsers: Map<string, OnlineUser> = new Map()

  async add(onlineUser: OnlineUser) {
    this.onlineUsers.set(onlineUser.userId.toString(), onlineUser)
  }

  async removeBySocketId(socketId: string) {
    for (const [userId, onlineUser] of this.onlineUsers.entries()) {
      if (onlineUser.socketId === socketId) {
        this.onlineUsers.delete(userId)
        break
      }
    }
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
