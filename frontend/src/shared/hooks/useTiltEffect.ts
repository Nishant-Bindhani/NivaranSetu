import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

export function useTiltEffect(maxDegrees = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(y, [0, 1], [maxDegrees, -maxDegrees]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxDegrees, maxDegrees]), springConfig)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function onMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}

export type TiltMotionValues = { rotateX: MotionValue<number>; rotateY: MotionValue<number> }
