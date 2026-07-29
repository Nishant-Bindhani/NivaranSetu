import { DiagonalGrid } from '@/components/landing/shared/bgpatterns/DiagonalGrid'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-secondary/20 py-24 dark:bg-primary/5">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-15">
        <DiagonalGrid />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
          {/* placeholder photo — swap the src once a real one exists */}
          <div className="mx-auto size-56 shrink-0 overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm sm:mx-0">
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              Your photo
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-sm font-medium tracking-[0.25em] text-primary uppercase dark:text-primary/90">
              About us
            </p>
            <h2 className="mt-3 text-2xl leading-snug font-bold text-balance sm:text-3xl">
              Built to make complaints{' '}
              <span className="font-heading text-3xl font-normal text-primary italic sm:text-4xl dark:text-primary/90">
                easier to file
              </span>
              , and easier to fix.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              NivaranSetu started in 2026, built from India, with one goal: make it
              simple for anyone to report a civic issue and actually see it resolved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
