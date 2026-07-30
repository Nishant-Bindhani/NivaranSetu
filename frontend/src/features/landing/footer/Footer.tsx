import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navGroups } from '@/features/landing/shared/navGroups'

// same to/href pattern as Navbar.tsx's renderNavLink — kept separate since
// footer links need different styling, not worth sharing one function for.
// fixed white/opacity colors, not theme tokens — bg-primary is always a
// solid dark color regardless of site theme (same reasoning as Channels/Cta)
function FooterLink({ labelKey, to, href, translate }: { labelKey: string; to?: string; href?: string; translate: (key: string) => string }) {
  const className = 'text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground'
  const label = translate(labelKey)
  if (to) return <Link to={to} className={className}>{label}</Link>
  return <a href={href} className={className}>{label}</a>
}

export function Footer() {
  const { t: translateCommon } = useTranslation('common')
  const { t: translateLanding } = useTranslation('landing')

  return (
    <footer className="bg-primary/95 py-16 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
                <path
                  d="M6 22V14C6 9 10.5 5 16 5C21.5 5 26 9 26 14V22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path d="M6 22H10V16H6V22Z" fill="currentColor" />
                <path d="M22 22H26V16H22V22Z" fill="currentColor" />
              </svg>
              NivaranSetu
            </Link>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/75">
              {translateLanding('footer.tagline')}
            </p>
          </div>

          {navGroups.map((group) => (
            <div key={group.titleKey}>
              <h3 className="text-sm font-semibold">{translateCommon(group.titleKey)}</h3>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.labelKey}>
                    <FooterLink {...link} translate={translateCommon} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-primary-foreground/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-primary-foreground/75">
            © {new Date().getFullYear()} NivaranSetu. {translateLanding('footer.copyright')}
          </p>
          <div className="flex gap-5 text-sm text-primary-foreground/75">
            <Link to="/privacy" className="transition-colors hover:text-primary-foreground">{translateLanding('footer.privacy')}</Link>
            <Link to="/terms" className="transition-colors hover:text-primary-foreground">{translateLanding('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
