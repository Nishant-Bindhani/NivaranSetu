import { api, type ApiSuccess } from '@/shared/lib/axios'
import type { AuthUser } from '@/shared/auth/authTypes'

export type RegisterInput = { email: string; password: string; name: string }
export type LoginInput = { email: string; password: string }
export type LoginResult = { accessToken: string; user: AuthUser }

export async function registerRequest(input: RegisterInput) {
  const response = await api.post<ApiSuccess<AuthUser>>('/v1/auth/register', input)
  return response.data
}

export async function loginRequest(input: LoginInput) {
  const response = await api.post<ApiSuccess<LoginResult>>('/v1/auth/login', input)
  return response.data
}

export async function refreshTokenRequest() {
  const response = await api.post<ApiSuccess<{ accessToken: string }>>('/v1/auth/refresh-token')
  return response.data
}

export async function getMeRequest(accessToken: string) {
  const response = await api.get<AuthUser>('/v1/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return response.data
}

export async function verifyEmailRequest(input: { email: string; code: string }) {
  const response = await api.post<ApiSuccess<LoginResult>>('/v1/auth/verify-email', input)
  return response.data
}

export async function resendVerificationCodeRequest(email: string) {
  const response = await api.post<{ success: true; message: string }>('/v1/auth/resend-verification-code', { email })
  return response.data
}
