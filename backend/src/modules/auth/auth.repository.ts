import { prisma } from '@config/database.js'

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export function createUser(data: { email: string; password: string; name: string }) {
  return prisma.user.create({ data })
}

export function findUserByGoogleId(googleId: string) {
  return prisma.user.findUnique({ where: { googleId } })
}

export function linkGoogleAccount(userId: string, googleId: string) {
  return prisma.user.update({ where: { id: userId }, data: { googleId } })
}

export function createGoogleUser(data: { email: string; name: string; googleId: string }) {
  return prisma.user.create({ data: { ...data, isEmailVerified: true } })
}

export function findVerificationToken(tokenHash: string, type: 'EMAIL_VERIFY' | 'PASSWORD_RESET') {
  return prisma.verificationToken.findUnique({ where: { tokenHash, type } })
}

export function consumeVerificationToken(tokenId: string, userId: string) {
  return prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { isEmailVerified: true } }),
    // deleteMany (not delete): a duplicate double-submit of the same code
    // (e.g. a slow network causing the user to click "verify" twice) would
    // otherwise crash with P2025 on the second delete instead of just being
    // a harmless no-op.
    prisma.verificationToken.deleteMany({ where: { id: tokenId } }),
  ])
}

export function resetUserPassword(tokenId: string, userId: string, hashedPassword: string) {
  return prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } }),
    prisma.verificationToken.deleteMany({ where: { id: tokenId } }),
    prisma.refreshToken.deleteMany({ where: { userId } }),
  ])
}

// Requesting a new OTP should invalidate any earlier, still-unexpired one
// for the same purpose — otherwise an old code from a prior request would
// remain valid alongside the new one.
export function deleteVerificationTokensForUser(userId: string, type: 'EMAIL_VERIFY' | 'PASSWORD_RESET') {
  return prisma.verificationToken.deleteMany({ where: { userId, type } })
}

export function createRefreshToken(data: {
  userId: string
  familyId: string
  tokenHash: string
  expiresAt: Date
  deviceInfo?: string
  ipAddress?: string
}) {
  return prisma.refreshToken.create({ data })
}

export function findRefreshToken(tokenHash: string) {
  return prisma.refreshToken.findUnique({ where: { tokenHash } })
}

export function deleteRefreshToken(id: string) {
  // deleteMany (not delete) so a concurrent duplicate refresh request — e.g.
  // multiple tabs open at once, each racing to rotate the same refresh
  // token on load — that already deleted this row doesn't crash with
  // P2025; it just deletes zero rows instead.
  return prisma.refreshToken.deleteMany({ where: { id } })
}

export function deleteTokenFamily(familyId: string) {
  return prisma.refreshToken.deleteMany({ where: { familyId } })
}

export function findRefreshTokensByUserId(userId: string) {
  return prisma.refreshToken.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export function deleteRefreshTokenForUser(id: string, userId: string) {
  return prisma.refreshToken.deleteMany({ where: { id, userId } })
}

export function createLoginHistory(data: {
  userId?: string
  emailAttempted: string
  status: 'SUCCESS' | 'FAILED'
  ipAddress?: string
  userAgent?: string
}) {
  return prisma.loginHistory.create({ data })
}
