export interface StorageProvider {
  saveFile(filename: string): Promise<string>
}
