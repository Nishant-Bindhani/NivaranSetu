// faint straight horizontal + vertical hairlines, like graph paper
export function GridLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      aria-hidden="true"
    />
  )
}
