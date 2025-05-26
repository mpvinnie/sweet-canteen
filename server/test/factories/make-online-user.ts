import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  OnlineUser,
  OnlineUserProps
} from '@/domain/realtime/enterprise/entities/online-user'

export function makeOnlineUser(
  override: Partial<OnlineUserProps> = {},
  id?: UniqueEntityID
) {
  const onlineUser = OnlineUser.create(
    {
      userId: new UniqueEntityID(),
      socketId: new UniqueEntityID().toString(),
      role: 'cook',
      ...override
    },
    id
  )

  return onlineUser
}
