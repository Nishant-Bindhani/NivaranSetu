import { lazy, Suspense } from 'react'
import { Navbar } from '@/features/landing/navbar/Navbar'
import { Hero } from '@/features/landing/hero/Hero'
import { HowItWorks } from '@/features/landing/howItWorks/HowItWorks'
import { Features } from '@/features/landing/features/Features'
import { Coverage } from '@/features/landing/coverage/Coverage'
import { Resolved } from '@/features/landing/resolved/Resolved'
import { Channels } from '@/features/landing/channels/Channels'
import { StatTicker } from '@/features/landing/statTicker/StatTicker'
import { About } from '@/features/landing/about/About'
import { Faq } from '@/features/landing/faq/Faq'
import { Footer } from '@/features/landing/footer/Footer'

// Leaflet is only needed once a visitor scrolls this far — keeps it out of
// the bundle everyone downloads just to see the hero section.
const MapShowcase = lazy(() => import('@/features/landing/mapShowcase/MapShowcase'))

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Coverage />
      <Suspense fallback={<div className="h-[600px]" />}>
        <MapShowcase />
      </Suspense>
      <Resolved />
      <Channels />
      <StatTicker />
      <About />
      <Faq />
      <Footer />
    </>
  )
}
