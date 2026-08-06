import ms from 'ms'
import { randomUUID } from 'crypto'
import { prisma } from '@config/database.js'
import { config } from '@config/env.js'
import { redis } from '@config/redis.js'
import { hashPassword, verifyPassword } from '@utils/password.js'
import { generateToken, hashToken, generateOtp, hashOtp } from '@utils/hash.js'
import { signAccessToken } from '@utils/jwt.js'
import type { Role } from '@utils/roles.js'
import { sendVerificationEmail, sendPasswordResetEmail } from '@utils/email.js'
import { AppError } from '@utils/AppError.js'
import { logger } from '@utils/logger.js'
import {
  findUserByEmail,
  findUserById,
  createUser,
  findUserByGoogleId,
  linkGoogleAccount,
  createGoogleUser,
  findVerificationToken,
  consumeVerificationToken,
  resetUserPassword,
  deleteVerificationTokensForUser,
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteTokenFamily,
  findRefreshTokensByUserId,
  deleteRefreshTokenForUser,
  createLoginHistory,
} from './auth.repository.js'
import { exchangeCodeForToken, fetchGoogleProfile } from './auth.google.js'
import type { RegisterInput, LoginInput } from './auth.types.js'

const REFRESH_TOKEN_EXPIRY_MS = () => ms(config.JWT_REFRESH_EXPIRES_IN as ms.StringValue)
const REUSE_DETECTION_TTL_SECONDS = () => ms(config.REUSE_DETECTION_TTL as ms.StringValue) / 1000

async function issueSession(
  user: { id: string; role: Role; orgId: string | null; deptId: string | null },
  device?: { deviceInfo?: string; ipAddress?: string },
) {
  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
    ...(user.orgId ? { orgId: user.orgId } : {}),
    ...(user.deptId ? { deptId: user.deptId } : {}),
  })

  const familyId = randomUUID()
  const rawRefreshToken = generateToken()

  await createRefreshToken({
    userId: user.id,
    familyId,
    tokenHash: hashToken(rawRefreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS()),
    ...(device?.deviceInfo ? { deviceInfo: device.deviceInfo } : {}),
    ...(device?.ipAddress ? { ipAddress: device.ipAddress } : {}),
  })

  return { accessToken, refreshToken: rawRefreshToken }
}

export async function registerUser(input: RegisterInput) {
  const existing = await findUserByEmail(input.email)
  if (existing) {
    throw new AppError('Email already registered', 409)
  }

  const hashedPassword = await hashPassword(input.password)
  const user = await createUser({
    email: input.email,
    password: hashedPassword,
    name: input.name,
  })

  const code = generateOtp()

  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      tokenHash: hashOtp(user.email, code),
      type: 'EMAIL_VERIFY',
      expiresAt: new Date(Date.now() + ms(config.EMAIL_VERIFY_EXPIRES_IN as ms.StringValue)),
    },
  })

  try {
    await sendVerificationEmail(user.email, code)
  } catch (err) {
    // registration must not fail just because the email didn't send — the
    // account and verification token both exist either way, so the failure
    // mode is "user requests a new verification link," not "stuck account
    // that has to be manually deleted from the DB before retrying."
    logger.error({ err, email: user.email }, 'Failed to send verification email')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  }
}

export async function verifyEmail(
  email: string,
  code: string,
  device?: { deviceInfo?: string; ipAddress?: string },
) {
  const token = await findVerificationToken(hashOtp(email, code), 'EMAIL_VERIFY')

  if (!token || token.expiresAt < new Date()) {
    throw new AppError('Invalid or expired code', 400)
  }

  const [user] = await consumeVerificationToken(token.id, token.userId)
  const session = await issueSession(user, device)

  return {
    ...session,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export async function resendVerificationCode(email: string) {
  const user = await findUserByEmail(email)
  if (!user || user.isEmailVerified) {
    return
  }

  await deleteVerificationTokensForUser(user.id, 'EMAIL_VERIFY')

  const code = generateOtp()
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      tokenHash: hashOtp(user.email, code),
      type: 'EMAIL_VERIFY',
      expiresAt: new Date(Date.now() + ms(config.EMAIL_VERIFY_EXPIRES_IN as ms.StringValue)),
    },
  })

  await sendVerificationEmail(user.email, code)
}

export async function loginUser(
  input: LoginInput,
  device?: { deviceInfo?: string; ipAddress?: string },
) {
  const logAttempt = (status: 'SUCCESS' | 'FAILED', userId?: string) =>
    createLoginHistory({
      emailAttempted: input.email,
      status,
      ...(userId ? { userId } : {}),
      ...(device?.ipAddress ? { ipAddress: device.ipAddress } : {}),
      ...(device?.deviceInfo ? { userAgent: device.deviceInfo } : {}),
    })

  const user = await findUserByEmail(input.email)
  if (!user) {
    await logAttempt('FAILED')
    throw new AppError('Invalid email or password', 401)
  }

  if (!user.password) {
    await logAttempt('FAILED', user.id)
    throw new AppError('This email is linked to a Google account — use Continue with Google to log in', 409)
  }

  const validPassword = await verifyPassword(user.password, input.password)
  if (!validPassword) {
    await logAttempt('FAILED', user.id)
    throw new AppError('Invalid email or password', 401)
  }

  if (!user.isEmailVerified) {
    await logAttempt('FAILED', user.id)
    throw new AppError('Please verify your email before logging in', 403)
  }

  const { accessToken, refreshToken } = await issueSession(user, device)

  await logAttempt('SUCCESS', user.id)

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export async function refreshTokens(rawToken: string) {
  const tokenHash = hashToken(rawToken)

  const reusedFamilyId = await redis.get(`used:${tokenHash}`)
  if (reusedFamilyId) {
    await deleteTokenFamily(reusedFamilyId)
    throw new AppError('Session revoked, please log in again', 401)
  }

  const existingToken = await findRefreshToken(tokenHash)
  if (!existingToken || existingToken.expiresAt < new Date()) {
    throw new AppError('Invalid or expired session, please log in again', 401)
  }

  const user = await findUserById(existingToken.userId)
  if (!user) {
    throw new AppError('Invalid or expired session, please log in again', 401)
  }

  await deleteRefreshToken(existingToken.id)
  await redis.set(`used:${tokenHash}`, existingToken.familyId, 'EX', REUSE_DETECTION_TTL_SECONDS())

  const rawNewRefreshToken = generateToken()
  await createRefreshToken({
    userId: user.id,
    familyId: existingToken.familyId,
    tokenHash: hashToken(rawNewRefreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS()),
  })

  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
    ...(user.orgId ? { orgId: user.orgId } : {}),
    ...(user.deptId ? { deptId: user.deptId } : {}),
  })

  return {
    accessToken,
    refreshToken: rawNewRefreshToken,
  }
}

export async function logoutUser(rawToken: string) {
  const tokenHash = hashToken(rawToken)
  const token = await findRefreshToken(tokenHash)

  if (token) {
    await deleteRefreshToken(token.id)
  }
}

export async function forgotPassword(email: string) {
  const user = await findUserByEmail(email)
  if (!user) {
    return
  }

  await deleteVerificationTokensForUser(user.id, 'PASSWORD_RESET')

  const code = generateOtp()
  await prisma.verificationToken.create({
    data: {
      userId: user.id,
      tokenHash: hashOtp(user.email, code),
      type: 'PASSWORD_RESET',
      expiresAt: new Date(Date.now() + ms(config.PASSWORD_RESET_EXPIRES_IN as ms.StringValue)),
    },
  })

  await sendPasswordResetEmail(user.email, code)
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const token = await findVerificationToken(hashOtp(email, code), 'PASSWORD_RESET')

  if (!token || token.expiresAt < new Date()) {
    throw new AppError('Invalid or expired code', 400)
  }

  const user = await findUserById(token.userId)
  if (user?.password && (await verifyPassword(user.password, newPassword))) {
    throw new AppError('New password must be different from your current password', 400)
  }

  const hashedPassword = await hashPassword(newPassword)
  await resetUserPassword(token.id, token.userId, hashedPassword)
}

export async function googleAuth(
  code: string,
  device?: { deviceInfo?: string; ipAddress?: string },
) {
  const accessToken = await exchangeCodeForToken(code)
  const profile = await fetchGoogleProfile(accessToken)

  if (!profile.email_verified) {
    throw new AppError('Google account email is not verified', 403)
  }

  let user = await findUserByGoogleId(profile.sub)

  if (!user) {
    const existingByEmail = await findUserByEmail(profile.email)
    if (existingByEmail) {
      user = await linkGoogleAccount(existingByEmail.id, profile.sub)
    } else {
      user = await createGoogleUser({
        email: profile.email,
        name: profile.name,
        googleId: profile.sub,
      })
    }
  }

  const session = await issueSession(user, device)

  return {
    ...session,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export async function listSessions(userId: string) {
  const sessions = await findRefreshTokensByUserId(userId)

  return sessions.map((session) => ({
    id: session.id,
    deviceInfo: session.deviceInfo,
    ipAddress: session.ipAddress,
    createdAt: session.createdAt,
    expiresAt: session.expiresAt,
  }))
}

export async function revokeSession(userId: string, sessionId: string) {
  const result = await deleteRefreshTokenForUser(sessionId, userId)

  if (result.count === 0) {
    throw new AppError('Session not found', 404)
  }
}

export async function revokeAllSessions(userId: string) {
  await prisma.refreshToken.deleteMany({ where: { userId } })
}
