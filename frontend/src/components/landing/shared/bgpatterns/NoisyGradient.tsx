// two soft color blurs, top-left and bottom-right — pure light/color depth, no line or dot texture
export function NoisyGradient() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
    </>
  )
}
