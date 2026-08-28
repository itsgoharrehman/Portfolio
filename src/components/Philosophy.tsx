import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const PRINCIPLES = [
  'SIMPLE OVER CLEVER.',
  'RELIABLE OVER FRAGILE.',
  'SYSTEMS OVER SHORTCUTS.',
]

export function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.85, 1, 1.04, 1.08])
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      id="philosophy"
      data-section
      ref={ref}
      style={{
        background: '#080808',
        padding: isMobile ? '6rem 1.5rem' : '10rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        position: 'relative',
        textAlign: 'center',
      }}
      aria-label="Engineering philosophy section"
    >
      {/* Faint background text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(8rem, 25vw, 22rem)',
            letterSpacing: '-0.06em',
            color: 'rgba(255,255,255,0.02)',
            textTransform: 'uppercase',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          GOOD
        </span>
      </div>

      {/* Main statement */}
      <motion.div
        style={{ scale, opacity, position: 'relative', zIndex: 1 }}
      >
        {['GOOD SOFTWARE', 'DISAPPEARS INTO', 'THE EXPERIENCE.'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: isMobile
                  ? 'clamp(2rem, 8vw, 4rem)'
                  : 'clamp(3rem, 7vw, 6.5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: i === 2 ? 'rgba(245,245,243,0.3)' : '#F5F5F3',
                margin: 0,
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </motion.div>

      {/* Principles */}
      <div
        style={{
          marginTop: isMobile ? '3rem' : '5rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '3rem',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {PRINCIPLES.map((principle, i) => (
          <motion.div
            key={principle}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              color: i === 0 ? '#C7FF4A' : '#8A8A87',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {i > 0 && !isMobile && (
              <span
                style={{ display: 'inline-block', width: '20px', height: '1px', background: 'rgba(138,138,135,0.3)' }}
                aria-hidden="true"
              />
            )}
            {principle}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
