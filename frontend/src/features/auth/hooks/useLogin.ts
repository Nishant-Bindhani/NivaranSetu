import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import type { AppDispatch } from '@/store/store'

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      dispatch(setCredentials(response.data))
      // every role lands on the same dashboard route for now — role-specific
      // routes get added once those areas actually exist (features/officer,
      // features/manager, features/admin)
      navigate('/dashboard')
    },
  })
}
