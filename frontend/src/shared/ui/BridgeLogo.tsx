// The brand mark: a suspension bridge (NivaranSetu — "setu" is Hindi for
// bridge). Previously an arch sitting on two solid blocks, which reads as a
// pair of headphones — every renderer that touched it (browser, Vite HMR,
// Gmail) rendered it as a headphone icon, consistently, which means it
// genuinely was that shape, not a caching artifact. This is a real
// suspension bridge: a deck, two towers, and cables fanning from each tower
// to the deck.
export function BridgeLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 23H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 6V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6L6 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6L16 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 6L16 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 6L26 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
