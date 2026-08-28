import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * SectionTransition — cinematic typographic bridge between the dark Hero
 * and the light About section. The words enter and exit as the user scrolls.
 */
export function SectionTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y1 = useTransform(scrollYProgress, [0, 0.4], ['60px', '0px'])
  const y2 = useTransform(scrollYProgress, [0.1, 0.5], ['80px', '0px'])

  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springY1 = useSpring(y1, { stiffness: 150, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 150, damping: 30 })

  return (
    <div
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #080808, #0f0f0f, #F1F0EC)',
        padding: isMobile ? '5rem 1.5rem' : '8rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-hidden="true"
    >
      <motion.div style={{ opacity: springOpacity }}>
        <motion.div
          style={{ y: springY1, overflow: 'hidden' }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: isMobile ? 'clamp(3rem, 12vw, 7rem)' : 'clamp(5rem, 13vw, 11rem)',
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: '#F5F5F3',
            }}
          >
            ENGINEERED
          </span>
        </motion.div>
        <motion.div
          style={{ y: springY2, overflow: 'hidden', marginTop: '0.1em' }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: isMobile ? 'clamp(3rem, 12vw, 7rem)' : 'clamp(5rem, 13vw, 11rem)',
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: 'rgba(17,17,17,0.6)',
            }}
          >
            NOT DECORATED.
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
