import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Role } from '@/core/types/role'

export interface OnlineUserProps {
  userId: UniqueEntityID
  socketId: string
  role: Role
}

export class OnlineUser extends ValueObject<OnlineUserProps> {
  static create(props: OnlineUserProps) {
    return new OnlineUser(props)
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
