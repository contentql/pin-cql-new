// utils/crypto.js
import { env } from '@env'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const key: string = env.ENCRYPTION_KEY! // Must be 32 bytes (256 bits)
const iv = crypto.randomBytes(16) // Initialization vector must be 16 bytes

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export const decrypt = (text: string) => {
  const [ivText, encryptedText] = text.split(':')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(ivText, 'hex'),
  )
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
