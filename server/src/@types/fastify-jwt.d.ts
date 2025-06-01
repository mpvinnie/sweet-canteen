import { Permission } from '@/core/types/permission'
import { Role } from '@/core/types/role'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      permissions: Permission
      role: Role
    }
  }
}
