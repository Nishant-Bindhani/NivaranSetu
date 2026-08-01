import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Camera01Icon,
  Compass01Icon,
  ConstructionIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'
import { DotGrid } from '@/features/landing/shared/bgpatterns/DotGrid'
import { BridgeLogo } from '@/shared/ui/BridgeLogo'

type AuthLayoutProps = {
  panelTitle: string
  panelBody?: string
  children: ReactNode
}

export function AuthLayout({ panelTitle, panelBody, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-2">
      {/* mobile: compact top banner, logo then title stacked — no room for the full scene */}
      <div className="relative flex flex-col gap-2 overflow-hidden bg-gradient-to-br from-primary to-rose-900 px-6 py-8 text-primary-foreground md:hidden">
        <div
          className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <BrandMark className="relative" />
        <p className="relative font-display text-lg leading-snug font-medium text-balance text-primary-foreground/90">
          {panelTitle}
        </p>
      </div>

      {/* desktop: full left panel with logo, pitch copy, and animated scene */}
      <div className="relative hidden flex-col overflow-hidden bg-gradient-to-br from-primary to-rose-900 px-6 py-8 text-primary-foreground md:flex lg:px-12 lg:py-12">
        <DotGrid />
        <div
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />

        <BrandMark className="relative mx-auto text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" />

        <div className="relative mt-2 text-center">
          <p className="font-display text-lg leading-[1.15] font-medium tracking-tight text-balance italic [font-variation-settings:'opsz'_32] [text-shadow:0_0_24px_rgba(255,255,255,0.35)] sm:text-xl lg:text-2xl lg:whitespace-nowrap">
            {panelTitle}
          </p>
          {panelBody && <p className="mx-auto mt-4 max-w-md text-lg text-primary-foreground/80">{panelBody}</p>}
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <ComplaintCycle />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">{children}</div>
    </div>
  )
}

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 text-2xl font-semibold ${className}`}>
      <BridgeLogo className="mt-1 size-[1.2em] shrink-0" />
      NivaranSetu
    </Link>
  )
}

const CYCLE_STAGES = [
  { icon: Camera01Icon, labelKey: 'filed', top: '6%', left: '50%', glowAnimation: 'glow-filed' },
  { icon: Compass01Icon, labelKey: 'routed', top: '50%', left: '94%', glowAnimation: 'glow-routed' },
  { icon: ConstructionIcon, labelKey: 'assigned', top: '94%', left: '50%', glowAnimation: 'glow-assigned' },
  { icon: CheckmarkCircle01Icon, labelKey: 'resolved', top: '50%', left: '6%', glowAnimation: 'glow-resolved' },
]

const CYCLE_DURATION_S = 6.4

const CYCLE_START_DELAY_S = 0.6

function ComplaintCycle() {
  const { t: translate } = useTranslation('landing')

  return (
    <div className="relative mx-auto size-48 self-center lg:size-64">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20" aria-hidden="true" />

      <div
        className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.7)]"
        style={{
          top: '6%',
          left: '50%',
          animation: `travel-ring ${CYCLE_DURATION_S}s linear ${CYCLE_START_DELAY_S}s infinite`,
        }}
        aria-hidden="true"
      />

      {CYCLE_STAGES.map(({ icon, labelKey, top, left, glowAnimation }) => (
        <div
          key={labelKey}
          className="absolute flex flex-col items-center gap-2"
          style={{ top, left, transform: 'translate(-50%, -50%)' }}
        >
          <span
            className="grid size-10 place-items-center rounded-full border-2 border-white/30 bg-primary text-white lg:size-14"
            style={{ animation: `${glowAnimation} ${CYCLE_DURATION_S}s linear ${CYCLE_START_DELAY_S}s infinite` }}
          >
            <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4 lg:size-6" />
          </span>
          <span className="absolute top-full mt-1 text-xs font-medium whitespace-nowrap text-primary-foreground/70">
            {translate(`auth.cycle.${labelKey}`)}
          </span>
        </div>
      ))}
    </div>
  )
}
