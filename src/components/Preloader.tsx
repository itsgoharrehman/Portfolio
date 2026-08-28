import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  const statusMessages = [
    'INITIALIZING SYSTEMS',
    'CALIBRATING ENVIRONMENT',
    'MOUNTING CORE ARCHITECTURE',
    'ESTABLISHING CONNECTION',
    'SYSTEM READY — 2026',
  ]

  useEffect(() => {
    // Lock scroll during load
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    const duration = 1400 // 1.4s load duration

    const updateLoader = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth progress curve
      const easeProgress = Math.floor(progress * progress * 100)
      setPercent(Math.min(easeProgress, 100))

      const step = Math.min(
        Math.floor(progress * statusMessages.length),
        statusMessages.length - 1
      )
      setStatusIndex(step)

      if (progress < 1) {
        requestAnimationFrame(updateLoader)
      } else {
        setPercent(100)
        setTimeout(() => {
          setIsDone(true)
          setTimeout(() => {
            document.body.style.overflow = ''
            onComplete()
          }, 700)
        }, 150)
      }
    }

    const rafId = requestAnimationFrame(updateLoader)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: EASE_CURTAIN },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#080808',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem 3rem',
            color: '#F5F5F3',
          }}
          aria-hidden="true"
        >
          {/* Top Bar: Brand & Year */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              color: '#8A8A87',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/favicon.svg"
                alt="Gohar Logo"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'block',
                  filter: 'drop-shadow(0 0 6px rgba(199, 255, 74, 0.5))',
                }}
              />
              <span>GOHAR REHMAN</span>
            </div>
            <span>PORTFOLIO — 2026</span>
          </div>

          {/* Centered Stage: Counter & Status */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: 'auto 0',
              padding: '1rem 0',
            }}
          >
            {/* Number counter with % (No clipping, ample line-height) */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(4.5rem, 14vw, 11rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                color: '#F5F5F3',
                display: 'inline-flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0 1rem',
              }}
            >
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(percent).padStart(3, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.4rem, 4vw, 3rem)',
                  color: '#C7FF4A',
                  fontWeight: 400,
                  display: 'inline-block',
                }}
              >
                %
              </span>
            </motion.div>

            {/* Status ticker */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: '#C7FF4A',
                textTransform: 'uppercase',
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span className="accent-dot accent-dot-pulse" />
              <span>{statusMessages[statusIndex]}</span>
            </div>

            {/* Centered Progress Bar */}
            <div
              style={{
                width: 'min(85vw, 360px)',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.1)',
                position: 'relative',
                marginTop: '2rem',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${percent}%`,
                  background: '#C7FF4A',
                  boxShadow: '0 0 10px rgba(199, 255, 74, 0.9)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              color: '#8A8A87',
              textTransform: 'uppercase',
            }}
          >
            <span>SOFTWARE ENGINEER / BACKEND SYSTEMS</span>
            <span>STANDBY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
