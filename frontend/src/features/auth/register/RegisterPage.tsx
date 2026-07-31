import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getApiErrorMessage } from '@/shared/lib/axios'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { AuthLayout } from '@/features/auth/shared/AuthLayout'

// matches backend/src/modules/auth/auth.validation.ts's registerSchema
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterForm = z.infer<typeof registerSchema>

export function RegisterPage() {
  const { t: translate } = useTranslation('landing')
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const { mutate, isPending, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  function onSubmit(data: RegisterForm) {
    mutate(data, { onSuccess: () => setSubmittedEmail(data.email) })
  }

  const errorMessage = getApiErrorMessage(error)

  if (submittedEmail) {
    return (
      <AuthLayout
        panelTitle={translate('auth.register.panelTitle')}
        panelBody={translate('auth.register.panelBody')}
      >
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-3xl font-semibold sm:text-4xl">Check your email</h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            We sent a verification link to {submittedEmail}. Verify your email before logging in.
          </p>
        </div>
      </AuthLayout>
    )
  }

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
            <Input id="password" type="password" className="h-11 text-base" {...register('password')} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={isPending}>
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <p className="mt-6 text-center text-base text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary underline underline-offset-4">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
