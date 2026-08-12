import { useSelector } from 'react-redux'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon } from '@hugeicons/core-free-icons'
import type { RootState } from '@/store/store'
import { useMyTicketCount } from '@/features/tickets/hooks/useMyTicketCount'
import { DotGrid } from '@/features/landing/shared/bgpatterns/DotGrid'

export function Welcome() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: openCount = 0 } = useMyTicketCount('OPEN')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-rose-50/60 to-amber-50/40 shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.15)] dark:from-transparent dark:via-transparent dark:to-transparent">
      <div
        className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden="true"
      />
      <DotGrid />

      <div className="relative mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-display text-4xl font-bold text-balance">Welcome back, {user?.name}</h1>

        {openCount > 0 ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <HugeiconsIcon icon={Alert02Icon} className="size-4" />
            {openCount} open complaint{openCount === 1 ? '' : 's'} in progress
          </div>
        ) : (
          <p className="mt-3 text-lg text-muted-foreground">Report an issue to get started</p>
        )}
      </div>
    </section>
  )
}
