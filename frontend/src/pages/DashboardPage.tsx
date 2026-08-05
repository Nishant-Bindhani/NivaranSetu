import { Button } from '@/shared/ui/button'
import { useLogout } from '@/features/auth/hooks/useLogout'

export function DashboardPage() {
  const { mutate: logout, isPending } = useLogout()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <p>Dashboard (coming soon)</p>
        <Button variant="outline" onClick={() => logout()} disabled={isPending}>
          {isPending ? 'Logging out...' : 'Log out'}
        </Button>
      </div>
    </div>
  )
}
