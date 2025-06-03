import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  AttendantsRepository,
  FindManyAttendantsFilters
} from '@/domain/app/application/repositories/attendants.repository'
import { Attendant } from '@/domain/app/enterprise/entities/attendant'
import { prisma } from '..'
import { PrismaAttendantMapper } from '../mappers/prisma-attendant.mapper'

export class PrismaAttendantsRepository implements AttendantsRepository {
  async findById(attendantId: string) {
    const attendant = await prisma.user.findUnique({
      where: {
        id: attendantId,
        role: 'ATTENDANT'
      }
    })

    if (!attendant) {
      return null
    }

    return PrismaAttendantMapper.toDomain(attendant)
  }

  async findByUsername(username: string) {
    const attendant = await prisma.user.findUnique({
      where: {
        username,
        role: 'ATTENDANT'
      }
    })

    if (!attendant) {
      return null
    }

    return PrismaAttendantMapper.toDomain(attendant)
  }

  async findMany(
    { name }: FindManyAttendantsFilters,
    { page }: PaginationParams
  ) {
    const attendants = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
        role: 'ATTENDANT'
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return attendants.map(PrismaAttendantMapper.toDomain)
  }

  async create(attendant: Attendant) {
    await prisma.user.create({
      data: PrismaAttendantMapper.toPrisma(attendant)
    })
  }

  async save(attendant: Attendant) {
    await prisma.user.update({
      where: {
        id: attendant.id.toString()
      },
      data: PrismaAttendantMapper.toPrisma(attendant)
    })
  }

  async delete(attendant: Attendant) {
    await prisma.user.delete({
      where: {
        id: attendant.id.toString()
      }
    })
  }
}
