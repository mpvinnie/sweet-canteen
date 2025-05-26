import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Role } from '@/core/types/role'

export interface OnlineUserProps {
  userId: UniqueEntityID
  socketId: string
  role: Role
}

export class OnlineUser extends Entity<OnlineUserProps> {
  static create(props: OnlineUserProps, id?: UniqueEntityID) {
    const onlineUser = new OnlineUser(
      {
        ...props
      },
      id
    )

    return onlineUser
  }

  get userId() {
    return this.props.userId
  }

  get socketId() {
    return this.props.socketId
  }

  get role() {
    return this.props.role
  }
}
