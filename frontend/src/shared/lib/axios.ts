import axios from 'axios'

// baseURL is relative — vite.config.ts proxies /api to the backend in dev,
// and both are served from the same origin in production. `withCredentials`
// is required so the backend's httpOnly refresh-token cookie is sent/received.
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// every backend response is shaped { success, data, message } or
// { success: false, error: { message } } — see backend/src/utils/apiResponse.ts
export type ApiSuccess<T> = { success: true; data: T; message: string }
export type ApiError = { success: false; error: { message: string } }
