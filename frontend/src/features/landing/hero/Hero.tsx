import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { AppMockup } from '@/features/landing/appMockup/AppMockup'
import { DotGrid } from '@/features/landing/shared/bgpatterns/DotGrid'

export function Hero() {
  const { t: translate } = useTranslation('landing')

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-b from-rose-50 to-rose-50/40 shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.15)] dark:from-transparent dark:to-transparent">
      {/* soft radial glow, top-left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <DotGrid />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-balance sm:text-5xl md:text-6xl">
            {translate('hero.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground md:mx-0">
            {translate('hero.body')}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Button size="lg" nativeButton={false} render={<Link to="/register">{translate('hero.lodgeComplaint')}</Link>} />
            <Button size="lg" variant="outline" nativeButton={false} render={<Link to="/track">{translate('hero.trackStatus')}</Link>} />
          </div>
        </div>

        <AppMockup />
      </div>
    </section>
  )
}
