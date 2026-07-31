import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { refreshTokenRequest, getMeRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

export function useSessionBootstrap() {
  const dispatch = useDispatch<AppDispatch>()
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      try {
        const { data } = await refreshTokenRequest()
        const user = await getMeRequest(data.accessToken)
        dispatch(setCredentials({ user, accessToken: data.accessToken }))
      } catch {
        // no valid refresh cookie — genuinely not logged in, nothing to do
      } finally {
        setIsBootstrapping(false)
      }
    }

    bootstrap()
  }, [dispatch])

  return isBootstrapping
}
