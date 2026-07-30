// one wide, very soft angled band of color — barely-there depth, no lines or dots at all
export function SoftBeam() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(115deg,transparent_20%,var(--primary)_50%,transparent_80%)] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      aria-hidden="true"
    />
  )
}
