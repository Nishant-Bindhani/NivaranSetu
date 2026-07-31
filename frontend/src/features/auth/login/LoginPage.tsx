import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'

// matches backend/src/modules/auth/auth.validation.ts's loginSchema
const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const { t: translate } = useTranslation('landing')
  const { mutate, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  function onSubmit(data: LoginForm) {
    mutate(data)
  }

  const errorMessage = getApiErrorMessage(error)

  return (
    <AuthLayout panelTitle={translate('auth.login.panelTitle')}>
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">{translate('auth.login.formTitle')}</h1>
        <p className="mt-2 text-center text-base text-muted-foreground">{translate('auth.login.formSubtitle')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" className="h-11 text-base" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input id="password" type="password" className="h-11 text-base" {...register('password')} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-base text-muted-foreground">
          Don't have an account? <Link to="/register" className="font-medium text-primary underline underline-offset-4">Register</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
