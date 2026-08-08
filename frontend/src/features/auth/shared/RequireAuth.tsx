import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

export function RequireAuth({ isBootstrapping, children }: { isBootstrapping: boolean; children: ReactNode }) {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!isBootstrapping && !user) {
      navigate('/login', { replace: true })
    }
  }, [user, isBootstrapping, navigate])

  if (isBootstrapping || !user) return null
  return children
}
