import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Camera01Icon,
  Compass01Icon,
  ConstructionIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'
import { SoftBeam } from '@/features/landing/shared/bgpatterns/SoftBeam'

const STEPS = [
  { icon: Camera01Icon, key: 'report' },
  { icon: Compass01Icon, key: 'route' },
  { icon: ConstructionIcon, key: 'assign' },
  { icon: CheckmarkCircle01Icon, key: 'confirm' },
]

export function HowItWorks() {
  const { t: translate } = useTranslation('landing')

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 to-background py-20 dark:from-transparent">
      <SoftBeam />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{translate('howItWorks.eyebrow')}</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          {translate('howItWorks.subtitle')}
        </p>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line, desktop only */}
          <div
            className="absolute top-6 left-0 hidden h-px w-full bg-border lg:block"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <div key={step.key} className="relative flex flex-col items-start gap-3">
              <span className="relative grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                <HugeiconsIcon icon={step.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="font-semibold">
                <span className="mr-1.5 text-muted-foreground">{index + 1}.</span>
                {translate(`howItWorks.steps.${step.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground">{translate(`howItWorks.steps.${step.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
