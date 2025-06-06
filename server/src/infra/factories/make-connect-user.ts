import { ConnectUserUseCase } from '@/domain/realtime/application/use-cases/connect-user'
import { RedisOnlineUsersRepository } from '../cache/redis/repositories/redis-online-users.repository'

export function makeConnectUserUseCase() {
  const onlineUsersRepository = new RedisOnlineUsersRepository()
  return new ConnectUserUseCase(onlineUsersRepository)
}
