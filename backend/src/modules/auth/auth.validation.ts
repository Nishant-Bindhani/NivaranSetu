import { z } from 'zod'

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1),
})

const otpCode = z.string().regex(/^\d{6}$/, 'Enter the 6-digit code')

export const verifyEmailSchema = z.object({
  email: z.email(),
  code: otpCode,
})

export const resendVerificationCodeSchema = z.object({
  email: z.email(),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const forgotPasswordSchema = z.object({
  email: z.email(),
})

export const resetPasswordSchema = z.object({
  email: z.email(),
  code: otpCode,
  password: z.string().min(8),
})
