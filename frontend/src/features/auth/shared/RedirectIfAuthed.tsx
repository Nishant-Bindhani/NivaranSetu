import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { postLoginRedirect } from '@/features/auth/shared/postLoginRedirect'
import type { RootState } from '@/store/store'

export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (user) {
      navigate(postLoginRedirect(user.role), { replace: true })
    }
  }, [user, navigate])

  return children
}
