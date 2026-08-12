import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { File01Icon, Alert02Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import type { RootState } from '@/store/store'
import { Card } from '@/shared/ui/card'
import { useMyTicketCount } from '@/features/tickets/hooks/useMyTicketCount'
import { DotGrid } from '@/features/landing/shared/bgpatterns/DotGrid'
import { useTiltEffect } from '@/shared/hooks/useTiltEffect'
import { cn } from '@/shared/lib/utils'

type Stat = {
  label: string
  value: number | undefined
  icon: typeof File01Icon
  accent: string
}

function StatCard({ label, value, icon, accent }: Stat) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTiltEffect(6)

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 800 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <Card className="group/stat relative items-start gap-3 overflow-hidden bg-card/80 px-4 py-4 shadow-[0_8px_20px_-8px_rgb(0_0_0_/_0.25)] backdrop-blur-sm">
          <div className={cn('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r', accent)} aria-hidden="true" />
          <div className={cn('flex size-9 items-center justify-center rounded-full bg-gradient-to-br', accent)}>
            <HugeiconsIcon icon={icon} className="size-4.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-oswald text-4xl font-medium tabular-nums">{value ?? '–'}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export function Welcome() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: totalCount } = useMyTicketCount()
  const { data: openCount } = useMyTicketCount('OPEN')
  const { data: resolvedCount } = useMyTicketCount('RESOLVED')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-rose-50/60 to-amber-50/40 shadow-[0_12px_32px_-16px_rgb(0_0_0_/_0.2)] dark:from-transparent dark:via-transparent dark:to-transparent">
      {/* film-grain texture over the gradient, so it reads as considered
          rather than a flat CSS gradient — same technique real hero
          sections use to avoid banding and add depth */}
      <svg className="pointer-events-none absolute inset-0 size-full opacity-[0.035] mix-blend-overlay" aria-hidden="true">
        <filter id="welcome-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#welcome-grain)" />
      </svg>

      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />
      <DotGrid />

      <div className="animate-in fade-in slide-in-from-bottom-2 relative mx-auto max-w-4xl px-6 py-14 duration-500">
        <h1 className="font-oswald text-3xl font-medium tracking-tight text-balance uppercase">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's an overview of your complaints.</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <StatCard label="Total complaints" value={totalCount} icon={File01Icon} accent="from-slate-500 to-slate-600" />
          <StatCard label="Open" value={openCount} icon={Alert02Icon} accent="from-primary to-red-600" />
          <StatCard label="Resolved" value={resolvedCount} icon={CheckmarkCircle02Icon} accent="from-emerald-500 to-emerald-600" />
        </div>
      </div>
    </section>
  )
}
