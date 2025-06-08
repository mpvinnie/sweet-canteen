import { env } from '@/infra/env'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp')
const uploadFolder = path.resolve(tmpFolder, 'uploads')

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true })
}

const generateFileName = (originalName: string): string => {
  const fileHash = crypto.randomBytes(10).toString('hex')
  const sanitized = originalName.trim().split(' ').join('-')
  return `${fileHash}-${sanitized}`
}

const imageBaseURL = () => {
  switch (env.NODE_ENV) {
    case 'dev':
      return `${env.STORAGE_BASE_URL}:${env.PORT}/${env.STORAGE_BUCKET}`
    default:
      return `${env.STORAGE_BASE_URL}/${env.STORAGE_BUCKET}`
  }
}

export default {
  tmpFolder,
  uploadFolder,
  generateFileName,
  imageBaseURL
}
