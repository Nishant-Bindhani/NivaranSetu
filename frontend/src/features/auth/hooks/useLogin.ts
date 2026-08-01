import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '@/features/auth/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import { postLoginRedirect } from '@/features/auth/shared/postLoginRedirect'
import type { AppDispatch } from '@/store/store'

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      dispatch(setCredentials(response.data))
      navigate(postLoginRedirect(response.data.user.role))
    },
  })
}
