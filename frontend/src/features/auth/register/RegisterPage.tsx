import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'
import { GoogleAuthButton } from '@/features/auth/shared/GoogleAuthButton'

// matches backend/src/modules/auth/auth.validation.ts's registerSchema
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterForm = z.infer<typeof registerSchema>

export function RegisterPage() {
  const { t: translate } = useTranslation('landing')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { mutate, isPending, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  function onSubmit(data: RegisterForm) {
    mutate(data, { onSuccess: () => navigate('/verify', { state: { email: data.email } }) })
  }

  const errorMessage = getApiErrorMessage(error)

  return (
    <AuthLayout
      panelTitle={translate('auth.register.panelTitle')}
      panelBody={translate('auth.register.panelBody')}
    >
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">{translate('auth.register.formTitle')}</h1>
        <p className="mt-2 text-center text-base text-muted-foreground">{translate('auth.register.formSubtitle')}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm">Name</Label>
            <Input id="name" type="text" className="h-11 text-base" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" className="h-11 text-base" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="h-11 pr-10 text-base"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="size-4.5" />
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isPending}>
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <GoogleAuthButton />

        <p className="mt-6 text-center text-base text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary underline underline-offset-4">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
