import { AdminsRepository } from '@/domain/app/application/repositories/admins.repository'
import { Admin } from '@/domain/app/enterprise/entities/admin'
import { prisma } from '..'
import { PrismaAdminMapper } from '../mappers/prisma-admin.mapper'

export class PrismaAdminsRepository implements AdminsRepository {
  async findByUsername(username: string) {
    const admin = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!admin) {
      return null
    }

    return PrismaAdminMapper.toDomain(admin)
  }

  async create(admin: Admin) {
    await prisma.user.create({
      data: {
        id: admin.id.toString(),
        name: admin.name,
        username: admin.username.value,
        passwordHash: admin.passwordHash,
        role: 'ADMIN',
        createdAt: admin.createdAt
      }
    })
  }
}
