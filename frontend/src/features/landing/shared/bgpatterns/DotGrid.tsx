// faint dot texture, fading top-to-bottom, used behind Hero + HowItWorks
export function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:[background-image:radial-gradient(var(--border)_1px,transparent_1px)] dark:opacity-100"
      aria-hidden="true"
    />
  )
}
