import { GetUserProfile } from '@/domain/app/application/use-cases/get-user-profile'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users.repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetUserProfile(usersRepository)
}
