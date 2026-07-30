// shared between Navbar and Footer, so both always show the same links —
// one source of truth instead of two lists drifting out of sync
export type NavLink = { label: string; to?: string; href?: string }

export const navGroups: { title: string; links: NavLink[] }[] = [
  {
    title: 'Complaints',
    links: [
      { label: 'Track a complaint', to: '/track' },
      { label: 'How to file', href: '#how-it-works' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Categories we cover', href: '#coverage' },
      { label: 'SLA & response times', href: '#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
]
