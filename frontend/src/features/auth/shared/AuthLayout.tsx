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
      <svg viewBox="0 0 32 32" className="mt-1 size-[1.2em] shrink-0" aria-hidden="true">
        <path
          d="M6 22V14C6 9 10.5 5 16 5C21.5 5 26 9 26 14V22"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M6 22H10V16H6V22Z" fill="currentColor" />
        <path d="M22 22H26V16H22V22Z" fill="currentColor" />
      </svg>
      NivaranSetu
    </Link>
  )
}

// The complaint lifecycle, same 4 stages as the landing page's HowItWorks
// section (report → route → assign → confirm), placed at 12/3/6/9 o'clock on
// a literal ring — an actual closed loop, not a line, since a cycle has no
// start or end. One ball flows clockwise around the ring forever; exactly one
// stage is lit at a time, synced to the ball's real position. This is the
// "gif" — no video/image asset exists in this project, every visual here is
// hand-built SVG/CSS (see Hero/MapShowcase), built with plain CSS/HTML rather
// than embedded in an SVG so the icons can be real DOM elements
// (HugeiconsIcon), not SVG path data.
//
// Each stage is placed by its CENTER point (top:X%, left:Y%) plus a full
// translate(-50%,-50%), so the icon's own center — not an edge — sits exactly
// on the ring line. top/left percentages below are the 4 compass points of a
// circle: 12 o'clock = (50%, 6%), 3 o'clock = (94%, 50%), 6 o'clock =
// (50%, 94%), 9 o'clock = (6%, 50%) — 6%/94% instead of 0%/100% so the
// icon's own radius doesn't push its edge outside the ring.
//
// Each stage has its OWN, fully independent, uniquely-named @keyframes
// (glow-filed/glow-routed/glow-assigned/glow-resolved, all in index.css) that
// hardcodes that ONE stage's entire dim/bright timeline directly — no shared
// keyframe, no animation-delay, nothing computed at runtime. This is more
// verbose than one shared keyframe + per-element delay, but a shared
// timeline that has to be kept in sync across 4 separately-delayed elements
// turned out to be fragile in practice (wrong stage lighting, then all 4
// lighting at once) — giving up the elegance removes the whole class of bug.
const CYCLE_STAGES = [
  { icon: Camera01Icon, labelKey: 'filed', top: '6%', left: '50%', glowAnimation: 'glow-filed' },
  { icon: Compass01Icon, labelKey: 'routed', top: '50%', left: '94%', glowAnimation: 'glow-routed' },
  { icon: ConstructionIcon, labelKey: 'assigned', top: '94%', left: '50%', glowAnimation: 'glow-assigned' },
  { icon: CheckmarkCircle01Icon, labelKey: 'resolved', top: '50%', left: '6%', glowAnimation: 'glow-resolved' },
]

const CYCLE_DURATION_S = 6.4

// One shared startup pause before the whole scene starts moving — applied
// identically to the ball AND all 4 glows, so everything still starts
// perfectly in phase with itself, just half a second later. A per-element
// delay is exactly what caused the earlier sync bugs; this is safe because
// every element gets the SAME value, not 4 different ones.
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
