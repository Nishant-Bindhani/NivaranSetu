import { HugeiconsIcon } from '@hugeicons/react'
import {
  FlashIcon,
  DropletIcon,
  Road01Icon,
  GarbageTruckIcon,
  Shield01Icon,
  Building02Icon,
} from '@hugeicons/core-free-icons'
import { GridLines } from '@/components/landing/shared/bgpatterns/GridLines'

const CATEGORIES = [
  {
    icon: FlashIcon,
    title: 'Electricity',
    body: 'Power outages, faulty meters, exposed wiring, billing disputes.',
  },
  {
    icon: DropletIcon,
    title: 'Water & Sanitation',
    body: 'Supply disruptions, leaks, contamination, drainage and sewage issues.',
  },
  {
    icon: Road01Icon,
    title: 'Roads & Infrastructure',
    body: 'Potholes, broken streetlights, damaged footpaths, traffic signals.',
  },
  {
    icon: GarbageTruckIcon,
    title: 'Waste Management',
    body: 'Missed collections, illegal dumping, overflowing bins, cleanliness.',
  },
  {
    icon: Shield01Icon,
    title: 'Public Safety',
    body: 'Unsafe areas, vandalism, encroachments, accident-prone spots.',
  },
  {
    icon: Building02Icon,
    title: 'Municipal Services',
    body: 'Permits, licenses, property records, building code violations.',
  },
]

export function Coverage() {
  return (
    <section id="coverage" className="relative overflow-hidden bg-background py-24">
      <GridLines />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.15em] text-primary uppercase">
            Categories we cover
          </p>
          <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
            Every civic issue, one place to report it
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            If it's a public service, it's covered. Complaints route straight to the
            department responsible, no need to know who to call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div key={category.title} className="rounded-xl border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={category.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
