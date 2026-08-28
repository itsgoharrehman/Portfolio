import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/._-'

interface UseTypewriterOptions {
  text: string
  scramble?: boolean
  duration?: number
  delay?: number
  trigger?: boolean
}

export function useTypewriter({
  text,
  scramble = false,
  duration = 1500,
  delay = 0,
  trigger = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState(scramble ? '' : text)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayText(text)
      return
    }

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp
        const elapsed = timestamp - startRef.current
        const progress = Math.min(elapsed / duration, 1)

        if (scramble) {
          const revealedCount = Math.floor(progress * text.length)
          let result = ''
          for (let i = 0; i < text.length; i++) {
            if (i < revealedCount) {
              result += text[i]
            } else if (text[i] === ' ') {
              result += ' '
            } else {
              result += CHARS[Math.floor(Math.random() * CHARS.length)]
            }
          }
          setDisplayText(result)
        } else {
          setDisplayText(text.slice(0, Math.floor(progress * text.length)))
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setDisplayText(text)
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafRef.current)
      startRef.current = null
    }
  }, [text, scramble, duration, delay, trigger])

  return displayText
}
