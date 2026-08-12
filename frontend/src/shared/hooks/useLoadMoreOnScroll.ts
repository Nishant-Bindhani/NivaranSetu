import { useEffect, useRef } from 'react'

export function useLoadMoreOnScroll(onIntersect: () => void, enabled: boolean) {
  const markerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onIntersect()
    })

    const marker = markerRef.current
    if (marker) observer.observe(marker)

    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return markerRef
}
