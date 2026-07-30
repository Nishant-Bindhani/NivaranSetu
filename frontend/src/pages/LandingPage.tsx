import { Navbar } from '@/features/landing/navbar/Navbar'
import { Hero } from '@/features/landing/hero/Hero'
import { HowItWorks } from '@/features/landing/howItWorks/HowItWorks'
import { Features } from '@/features/landing/features/Features'
import { Coverage } from '@/features/landing/coverage/Coverage'
import { MapShowcase } from '@/features/landing/mapShowcase/MapShowcase'
import { Resolved } from '@/features/landing/resolved/Resolved'
import { Channels } from '@/features/landing/channels/Channels'
import { StatTicker } from '@/features/landing/statTicker/StatTicker'
import { About } from '@/features/landing/about/About'
import { Faq } from '@/features/landing/faq/Faq'
import { Footer } from '@/features/landing/footer/Footer'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Coverage />
      <MapShowcase />
      <Resolved />
      <Channels />
      <StatTicker />
      <About />
      <Faq />
      <Footer />
    </>
  )
}
