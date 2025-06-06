import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Role } from '@/core/types/role'
import { OnlineUsersRepository } from '@/domain/realtime/application/repositories/online-users.repository'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'
import { redis } from '@/infra/cache/redis'

export class RedisOnlineUsersRepository implements OnlineUsersRepository {
  private getRoleKey(role: Role) {
    return `online-users:${role}`
  }

  private getSocketKey(socketId: string) {
    return `socket-user:${socketId}`
  }

  async add(onlineUser: OnlineUser) {
    const { userId, role, socketId } = onlineUser

    const userData = JSON.stringify({ userId, role, socketId })

    await redis.sadd(this.getRoleKey(role), userData)

    await redis.set(this.getSocketKey(socketId), userData)

    await redis.expire(this.getSocketKey(socketId), 60 * 60) // 1h
  }

  async removeByUserId(userId: string) {
    const keys = await redis.keys('socket-user:*')

    for (const key of keys) {
      const data = await redis.get(key)

      if (!data) continue

      const parsed = JSON.parse(data)

      if (parsed.userId.value === userId) {
        await redis.del(key)
        await redis.srem(this.getRoleKey(parsed.role), data)
      }
    }
  }

  async getAllByRole(role: Role) {
    const users = await redis.smembers(this.getRoleKey(role))

    return users.map(raw => {
      const { userId, role, socketId } = JSON.parse(raw)
      return OnlineUser.create({
        userId: new UniqueEntityID(userId.role),
        role,
        socketId
      })
    })
  }

  async getAll() {
    const roles: Role[] = ['cook', 'attendant', 'admin']
    const allUsers: OnlineUser[] = []

    for (const role of roles) {
      const users = await this.getAllByRole(role)
      allUsers.push(...users)
    }

    return allUsers
  }

  async refreshSocket(socketId: string, userId: string): Promise<void> {
    const data = await redis.get(this.getSocketKey(socketId))
    if (!data) return

    const parsed = JSON.parse(data)
    if (parsed.userId.value !== userId) return

    await redis.expire(this.getSocketKey(socketId), 60 * 60)
  }
}
