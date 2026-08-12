import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { store } from '@/store/store'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

export const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export type ApiSuccess<T> = { success: true; data: T; message: string }

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean }

// Access tokens expire (15m) with no other mechanism to renew them mid-session
// (useSessionBootstrap only refreshes once, on initial page load) — without
// this, every request just 401s forever until the user hard-refreshes.
let refreshPromise: Promise<string> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined

    if (error.response?.status !== 401 || !config || config._retried) {
      return Promise.reject(error)
    }
    config._retried = true

    try {
      // Single-flight: if several requests 401 around the same moment,
      // only the first triggers a real refresh — the rest await the same
      // in-flight promise. Otherwise each would call refresh-token
      // independently, and the backend's reuse-detection (refresh tokens
      // rotate on use) would treat the second call as a replayed token
      // and revoke the whole session.
      refreshPromise ??= axios
        .post<ApiSuccess<{ accessToken: string }>>(`${API_BASE_URL}/v1/auth/refresh-token`, undefined, {
          withCredentials: true,
        })
        .then((res) => {
          const user = store.getState().auth.user
          if (user) store.dispatch(setCredentials({ user, accessToken: res.data.data.accessToken }))
          return res.data.data.accessToken
        })
        .finally(() => {
          refreshPromise = null
        })

      const accessToken = await refreshPromise
      config.headers.Authorization = `Bearer ${accessToken}`
      return api(config)
    } catch {
      store.dispatch(clearCredentials())
      return Promise.reject(error)
    }
  },
)

export function getApiErrorMessage(error: unknown): string | undefined {
  if (error instanceof AxiosError) {
    return error.response?.data?.error?.message
  }
  return undefined
}
