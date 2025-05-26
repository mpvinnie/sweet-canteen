import { HashProvider } from '@/domain/app/application/providers/hash.provider'

export class FakeHashProvider implements HashProvider {
  async hash(plain: string) {
    return `hashed-${plain}`
  }

  async compare(plain: string, hash: string) {
    return `hashed-${plain}` === hash
  }
}
