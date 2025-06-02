import { User } from '../../enterprise/entities/user'

export interface FindManyEmployeesFilters {
  name?: string
}

export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
}
