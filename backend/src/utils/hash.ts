import { createHash, randomBytes, randomInt } from 'crypto'

export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export function hashToken(rawToken: string): string {
  return createHash('sha256').update(rawToken).digest('hex')
}

export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0')
}

// A 6-digit OTP has far less entropy than the 32-byte tokens above, so two
// different users could plausibly land on the same code — scope the hash by
// email to keep tokenHash's existing @unique constraint valid without a
// schema change.
export function hashOtp(email: string, code: string): string {
  return hashToken(`${email.toLowerCase()}:${code}`)
}
