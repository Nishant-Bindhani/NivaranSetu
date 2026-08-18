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

// Single-flight: refresh tokens rotate on use, so two concurrent calls (e.g.
// React StrictMode double-invoking useSessionBootstrap's effect) would have
// the second one reuse an already-rotated token — the backend's reuse
// detection then treats that as theft and revokes the whole session.
let refreshTokenPromise: Promise<ApiSuccess<{ accessToken: string }>> | null = null

export function refreshTokenRequest() {
  refreshTokenPromise ??= api
    .post<ApiSuccess<{ accessToken: string }>>('/v1/auth/refresh-token')
    .then((response) => response.data)
    .finally(() => {
      refreshTokenPromise = null
    })
  return refreshTokenPromise
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

export async function forgotPasswordRequest(email: string) {
  const response = await api.post<{ success: true; message: string }>('/v1/auth/forgot-password', { email })
  return response.data
}

export async function resetPasswordRequest(input: { email: string; code: string; password: string }) {
  const response = await api.post<{ success: true; message: string }>('/v1/auth/reset-password', input)
  return response.data
}

export async function logoutRequest() {
  const response = await api.post<{ success: true; message: string }>('/v1/auth/logout')
  return response.data
}
