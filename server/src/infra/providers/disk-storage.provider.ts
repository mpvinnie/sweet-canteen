import uploadConfig from '@/core/config/upload'
import { StorageProvider } from '@/domain/app/application/providers/storage.provider'
import fs from 'node:fs'
import path from 'node:path'

export class DiskStorageProvider implements StorageProvider {
  async saveFile(filename: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadFolder, filename)
    )

    return filename
  }
}
