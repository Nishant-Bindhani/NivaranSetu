import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutRequest } from '@/features/auth/api/authApi'
import { clearCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      dispatch(clearCredentials())
      navigate('/login', { replace: true })
    },
  })
}
