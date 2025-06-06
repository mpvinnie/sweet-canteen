import { Permission } from '@/core/types/permission'
import { RolePermissions } from '@/core/types/role'
import { FastifyReply, FastifyRequest } from 'fastify'

interface EnsurePermissionsOptions {
  permissions: Permission[]
}

export function ensurePermissions({ permissions }: EnsurePermissionsOptions) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user

    if (!user) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }

    const allowedPermissions = RolePermissions[user.role]

    const hasAllPermissions = permissions.every(permission =>
      allowedPermissions.includes(permission)
    )

    if (!hasAllPermissions) {
      return reply
        .status(403)
        .send({ message: 'Fobidden: insufficient permissions.' })
    }
  }
}
