import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { verifyEmailRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

// user-triggered (submits a 6-digit code), unlike the old link-based flow —
// no auto-fire-on-mount needed anymore. A successful verify also logs the
// user in (backend issues a real session) — the page shows a success
// screen and lets the user proceed to the dashboard from there, rather than
// silently redirecting them.
export function useVerifyEmail() {
  const dispatch = useDispatch<AppDispatch>()

  return useMutation({
    mutationFn: verifyEmailRequest,
    onSuccess: (response) => {
      dispatch(setCredentials(response.data))
    },
  })
}
