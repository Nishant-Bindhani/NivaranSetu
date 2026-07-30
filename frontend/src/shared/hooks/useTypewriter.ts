import { useEffect, useState } from 'react'

// types out each string in `words`, pauses, erases, moves to the next — loops forever
export function useTypewriter(words: string[], typingSpeedMs = 40, pauseMs = 1800) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'fading' | 'erasing'>('typing')

  useEffect(() => {
    const currentWord = words[wordIndex]

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        const timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeedMs)
        return () => clearTimeout(timer)
      }
      // fully typed — switch to 'pausing' immediately (0 delay) so the caller's
      // fade-in for secondary content starts right as the last character lands
      const timer = setTimeout(() => setPhase('pausing'), 0)
      return () => clearTimeout(timer)
    }

    if (phase === 'pausing') {
      // secondary content stays visible (fully faded in) for pauseMs
      const timer = setTimeout(() => setPhase('fading'), pauseMs)
      return () => clearTimeout(timer)
    }

    if (phase === 'fading') {
      // secondary content is fading out here — give it 300ms to finish
      // before erasing starts removing characters
      const timer = setTimeout(() => setPhase('erasing'), 300)
      return () => clearTimeout(timer)
    }

    // erasing
    if (text.length > 0) {
      const timer = setTimeout(() => setText(text.slice(0, -1)), typingSpeedMs / 2)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length)
      setPhase('typing')
    }, 0)
    return () => clearTimeout(timer)
  }, [text, phase, wordIndex, words, typingSpeedMs, pauseMs])

  return { text, index: wordIndex, phase }
}
