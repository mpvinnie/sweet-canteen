import { Entity } from '@/core/entities/entity'
import { Permission } from '@/core/types/permission'
import { Role, RolePermissions } from '@/core/types/role'
import { Username } from '../../application/use-cases/value-objects/username'

export interface UserProps {
  name: string
  username: Username
  passwordHash: string
  role: Role
  createdAt: Date
}

export abstract class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get username() {
    return this.props.username
  }

  set username(username: Username) {
    this.props.username = username
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  set passwordHash(passwordHash: string) {
    this.props.passwordHash = passwordHash
  }

  get role() {
    return this.props.role
  }

  set role(role: Role) {
    this.props.role = role
  }

  get permissions() {
    return RolePermissions[this.role]
  }

  get createdAt() {
    return this.props.createdAt
  }

  hasPermission(permission: Permission) {
    return this.permissions.includes(permission)
  }
}
