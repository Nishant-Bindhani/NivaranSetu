// faint 45°-angled line texture, fading top-to-bottom — a structured counterpart to DotGrid
export function DiagonalGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(45deg,var(--muted-foreground)_0,var(--muted-foreground)_1px,transparent_1px,transparent_24px)] opacity-10 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-5"
      aria-hidden="true"
    />
  )
}
