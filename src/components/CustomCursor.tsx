import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

type CursorState = 'default' | 'link' | 'text' | 'view'

export function CustomCursor() {
  const isTouchDevice = useMediaQuery('(hover: none)')
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [label, setLabel] = useState('VIEW ↗')

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (isTouchDevice) return

    const animate = () => {
      const dot = dotRef.current
      const ring = ringRef.current
      const lbl = labelRef.current
      if (!dot || !ring) return

      // Dot follows immediately
      dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`

      // Ring follows with lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      const hw = ring.offsetWidth / 2
      const hh = ring.offsetHeight / 2
      ring.style.transform = `translate(${ringPos.current.x - hw}px, ${ringPos.current.y - hh}px)`
      if (lbl) {
        lbl.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) {
        const lbl = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || 'VIEW ↗'
        setLabel(lbl)
        setCursorState('view')
      } else if (target.closest('a, button, [role="button"], [data-cursor="link"]')) {
        setCursorState('link')
      } else if (target.closest('p, h1, h2, h3, h4, [data-cursor="text"]')) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  const ringClasses = [
    'cursor-ring',
    cursorState === 'link' || cursorState === 'view' ? 'cursor-link' : '',
    cursorState === 'text' ? 'cursor-text' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: cursorState === 'view' ? '0px' : '8px',
          height: cursorState === 'view' ? '0px' : '8px',
          opacity: cursorState === 'text' ? 0 : 1,
        }}
      />
      <div ref={ringRef} className={ringClasses} />
      {(cursorState === 'view') && (
        <div
          ref={labelRef}
          className="cursor-label"
          style={{ opacity: 1, pointerEvents: 'none' }}
        >
          {label}
        </div>
      )}
    </div>
  )
}
