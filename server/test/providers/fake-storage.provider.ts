import { StorageProvider } from '@/domain/app/application/providers/storage.provider'

export class FakeStorageProvider implements StorageProvider {
  public items: string[] = []

  async saveFile(filename: string) {
    this.items.push(filename)

    return filename
  }
}
