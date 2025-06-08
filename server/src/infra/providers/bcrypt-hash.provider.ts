import { HashProvider } from '@/domain/app/application/providers/hash.provider'
import { compare, hash } from 'bcrypt'

export class BCryptHashProvider implements HashProvider {
  async hash(plain: string) {
    return await hash(plain, 12)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }
}
