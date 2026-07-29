import { Navbar } from '@/components/landing/navbar/Navbar'
import { Hero } from '@/components/landing/hero/Hero'
import { HowItWorks } from '@/components/landing/howItWorks/HowItWorks'
import { Features } from '@/components/landing/features/Features'
import { Coverage } from '@/components/landing/coverage/Coverage'
import { MapShowcase } from '@/components/landing/mapShowcase/MapShowcase'
import { Resolved } from '@/components/landing/resolved/Resolved'
import { Channels } from '@/components/landing/channels/Channels'
import { StatTicker } from '@/components/landing/statTicker/StatTicker'
import { About } from '@/components/landing/about/About'
import { Faq } from '@/components/landing/faq/Faq'
import { Footer } from '@/components/landing/footer/Footer'

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
