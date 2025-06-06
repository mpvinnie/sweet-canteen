import { Role } from '@/core/types/role'
import { OnlineUsersRepository } from '@/domain/realtime/application/repositories/online-users.repository'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'
import { redis } from '@/infra/cache/redis'
import { RedisOnlineUsersMapper } from '../mappers/redis-online-users.mapper'

export class RedisOnlineUsersRepository implements OnlineUsersRepository {
  private getRoleKey(role: Role) {
    return `online-users:${role}`
  }

  private getSocketKey(socketId: string) {
    return `socket-user:${socketId}`
  }

  async add(onlineUser: OnlineUser) {
    const { role, socketId } = onlineUser

    const onlinUserData = RedisOnlineUsersMapper.toRedis(onlineUser)

    await redis.sadd(this.getRoleKey(role), onlinUserData)

    await redis.set(this.getSocketKey(socketId), onlinUserData)

    await redis.expire(this.getSocketKey(socketId), 60 * 60) // 1h
  }

  async removeBySocketId(socketId: string) {
    const keys = await redis.keys('socket-user:*')

    for (const key of keys) {
      const data = await redis.get(key)

      if (!data) continue

      const onlineUser = RedisOnlineUsersMapper.toDomain(data)

      if (onlineUser.socketId === socketId) {
        await redis.del(key)
        await redis.srem(this.getRoleKey(onlineUser.role), data)
      }
    }
  }

  async getAllByRole(role: Role) {
    const users = await redis.smembers(this.getRoleKey(role))

    return users.map(raw => {
      const onlineUser = RedisOnlineUsersMapper.toDomain(raw)
      return OnlineUser.create(onlineUser)
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

    const onlineUser = RedisOnlineUsersMapper.toDomain(data)
    if (onlineUser.userId.toString() !== userId) return

    await redis.expire(this.getSocketKey(socketId), 60 * 60)
  }
}
