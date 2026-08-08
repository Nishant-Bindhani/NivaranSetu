import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { BridgeLogo } from '@/shared/ui/BridgeLogo'
import { SettingsMenu } from '@/features/landing/settingsMenu/SettingsMenu'
import { useLogout } from '@/features/auth/hooks/useLogout'

export function AuthedNavbar() {
  const { mutate: logout, isPending } = useLogout()

  return (
    <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/citizen-dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <BridgeLogo className="size-8 text-primary" />
          NivaranSetu
        </Link>

        <div className="flex items-center gap-2">
          <SettingsMenu />
          <Button variant="outline" onClick={() => logout()} disabled={isPending}>
            {isPending ? 'Logging out...' : 'Log out'}
          </Button>
        </div>
      </div>
    </header>
  )
}
