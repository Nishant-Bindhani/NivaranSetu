import { HugeiconsIcon } from '@hugeicons/react'
import {
  Camera01Icon,
  Compass01Icon,
  ConstructionIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'
import { SoftBeam } from '@/features/landing/shared/bgpatterns/SoftBeam'

const STEPS = [
  {
    icon: Camera01Icon,
    title: 'You report it',
    body: "Snap a photo, drop a pin, tell us what's wrong. Takes about two minutes.",
  },
  {
    icon: Compass01Icon,
    title: 'We route it',
    body: 'No guessing which department to call. We figure that out for you, instantly.',
  },
  {
    icon: ConstructionIcon,
    title: 'Someone shows up',
    body: 'An officer gets assigned and actually does the work, with photos to prove it.',
  },
  {
    icon: CheckmarkCircle01Icon,
    title: "You confirm it's fixed",
    body: "Not us saying it's done. You saying it's done.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 to-background py-20 dark:from-transparent">
      <SoftBeam />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">How it actually works</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          A clear process from submission to resolution, with full visibility at every step.
        </p>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line, desktop only */}
          <div
            className="absolute top-6 left-0 hidden h-px w-full bg-border lg:block"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-start gap-3">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                <HugeiconsIcon icon={step.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="font-semibold">
                <span className="mr-1.5 text-muted-foreground">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
