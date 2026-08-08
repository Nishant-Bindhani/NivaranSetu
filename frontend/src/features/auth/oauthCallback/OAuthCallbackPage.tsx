import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMeRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

// Backend's googleCallback already set the refresh cookie and redirected here
// with the access token in the URL — no separate refresh-token call needed,
// just fetch the profile and finish logging in.
export function OAuthCallbackPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [failed, setFailed] = useState(false)

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) return

    async function completeLogin(accessToken: string) {
      try {
        const user = await getMeRequest(accessToken)
        dispatch(setCredentials({ user, accessToken }))
        navigate('/citizen-dashboard', { replace: true })
      } catch {
        setFailed(true)
      }
    }

    completeLogin(token)
  }, [token, dispatch, navigate])

  if (!token || failed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-2 px-6 text-center">
        <h1 className="text-2xl font-semibold">Sign-in failed</h1>
        <p className="text-muted-foreground">Something went wrong signing you in with Google. Try again from the login page.</p>
      </div>
    )
  }

  return null
}
