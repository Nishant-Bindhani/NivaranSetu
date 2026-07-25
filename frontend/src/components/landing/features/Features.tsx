import { HugeiconsIcon } from '@hugeicons/react'
import {
  Clock01Icon,
  Route01Icon,
  ShieldKeyIcon,
  CheckmarkBadge01Icon,
} from '@hugeicons/core-free-icons'
import { NoisyGradient } from '@/components/landing/shared/bgpatterns/NoisyGradient'

const FEATURES = [
  {
    icon: Clock01Icon,
    title: 'Time-bound response',
    body: 'Every complaint carries a deadline. If a department misses it, the case escalates automatically instead of going quiet.',
  },
  {
    icon: Route01Icon,
    title: 'Automatic routing',
    body: 'Complaints reach the right department the moment they are filed. No forwarding, no dead ends, no "not my desk".',
  },
  {
    icon: CheckmarkBadge01Icon,
    title: 'Citizen-verified closure',
    body: 'A case is only marked resolved once you confirm it. The department cannot close it on your behalf.',
  },
  {
    icon: ShieldKeyIcon,
    title: 'Private by default',
    body: 'Your contact details stay hidden from public view. Only the assigned officer sees what they need to act on your case.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-gradient-to-r from-rose-50 via-background to-background py-24 dark:from-transparent">
      <NoisyGradient />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        {/* left column stays in view while the list scrolls past on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium tracking-[0.15em] text-primary uppercase">
            Why it works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
            Built so complaints can't fall through the cracks
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            The system is designed around accountability, not paperwork. Every case is
            tracked, timed, and closed only when it's genuinely done.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-card p-8">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={feature.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
