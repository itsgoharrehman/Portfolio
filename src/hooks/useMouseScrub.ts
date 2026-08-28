import { useEffect, useRef, useCallback } from 'react'

interface UseMouseScrubOptions {
  smoothing?: number
  disabled?: boolean
}

export function useMouseScrub(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options: UseMouseScrubOptions = {}
) {
  const { smoothing = 0.08, disabled = false } = options
  const rafRef = useRef<number>(0)
  const targetTimeRef = useRef(0)
  const currentTimeRef = useRef(0)
  const lastSeekRef = useRef(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const video = videoRef.current
      if (!video || disabled) return
      const normalized = e.clientX / window.innerWidth
      targetTimeRef.current = normalized * (video.duration || 10)
    },
    [videoRef, disabled]
  )

  useEffect(() => {
    if (disabled) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const video = videoRef.current
    if (!video) return

    const animate = () => {
      const target = targetTimeRef.current
      const current = currentTimeRef.current
      const next = current + (target - current) * smoothing
      currentTimeRef.current = next

      const now = performance.now()
      if (Math.abs(next - current) > 0.001 && now - lastSeekRef.current > 40) {
        if (video.readyState >= 2) {
          video.currentTime = next
          lastSeekRef.current = now
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    video.pause()
    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [videoRef, smoothing, disabled, handleMouseMove])
}
