import { useTranslation } from 'react-i18next'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FlashIcon,
  DropletIcon,
  Road01Icon,
  GarbageTruckIcon,
  Shield01Icon,
  Building02Icon,
} from '@hugeicons/core-free-icons'
import { GridLines } from '@/features/landing/shared/bgpatterns/GridLines'

const CATEGORIES = [
  { icon: FlashIcon, key: 'electricity' },
  { icon: DropletIcon, key: 'water' },
  { icon: Road01Icon, key: 'roads' },
  { icon: GarbageTruckIcon, key: 'waste' },
  { icon: Shield01Icon, key: 'safety' },
  { icon: Building02Icon, key: 'municipal' },
]

export function Coverage() {
  const { t: translate } = useTranslation('landing')

  return (
    <section id="coverage" className="relative overflow-hidden bg-background py-24">
      <GridLines />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.15em] text-primary uppercase">
            {translate('coverage.eyebrow')}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
            {translate('coverage.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {translate('coverage.body')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div key={category.key} className="rounded-xl border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={category.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{translate(`coverage.categories.${category.key}.title`)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{translate(`coverage.categories.${category.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
