import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'

export class RedisOnlineUsersMapper {
  static toDomain(raw: string): OnlineUser {
    const parsed = JSON.parse(raw)

    return OnlineUser.create({
      userId: new UniqueEntityID(parsed.userId),
      socketId: parsed.socketId,
      role: parsed.role
    })
  }

  static toRedis(onlineUser: OnlineUser): string {
    return JSON.stringify({
      userId: onlineUser.userId.toString(),
      role: onlineUser.role,
      socketId: onlineUser.socketId
    })
  }
}
