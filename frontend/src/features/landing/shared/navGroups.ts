// shared between Navbar and Footer, so both always show the same links —
// one source of truth instead of two lists drifting out of sync.
// labelKey/titleKey point into i18n/locales/*/common.json's "nav" section
export type NavLink = { labelKey: string; to?: string; href?: string }

export const navGroups: { titleKey: string; links: NavLink[] }[] = [
  {
    titleKey: 'nav.complaints',
    links: [
      { labelKey: 'nav.trackComplaint', to: '/track' },
      { labelKey: 'nav.howToFile', href: '#how-it-works' },
    ],
  },
  {
    titleKey: 'nav.resources',
    links: [
      { labelKey: 'nav.categoriesWeCover', href: '#coverage' },
      { labelKey: 'nav.slaResponseTimes', href: '#features' },
    ],
  },
  {
    titleKey: 'nav.company',
    links: [
      { labelKey: 'nav.aboutUs', href: '#about' },
      { labelKey: 'nav.faq', href: '#faq' },
    ],
  },
]
