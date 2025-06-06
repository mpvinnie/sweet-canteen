import { DisconnectUserUseCase } from '@/domain/realtime/application/use-cases/disconnect-user'
import { RedisOnlineUsersRepository } from '../cache/redis/repositories/redis-online-users.repository'

export function makeDisconnectUserUseCase() {
  const onlineUsersRepository = new RedisOnlineUsersRepository()
  return new DisconnectUserUseCase(onlineUsersRepository)
}
