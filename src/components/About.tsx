import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const lineVariants = {
  hidden: { y: '105%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { delay: i * 0.1, duration: 0.85, ease: EASE_OUT_EXPO },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
}

function RevealLine({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div custom={index} variants={lineVariants}>
        {children}
      </motion.div>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      id="about"
      data-section
      ref={ref}
      style={{
        background: '#F1F0EC',
        color: '#111111',
        padding: isMobile ? '5rem 1.5rem' : '8rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="About section"
    >
      {/* Section marker */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.22em',
          color: '#8A8A87',
          textTransform: 'uppercase',
          marginBottom: isMobile ? '2.5rem' : '4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '20px',
            height: '1px',
            background: '#C7FF4A',
          }}
          aria-hidden="true"
        />
        01 / ABOUT
      </motion.div>

      {/* Large heading */}
      <motion.h2
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: isMobile ? 'clamp(2.2rem, 8vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          textTransform: 'uppercase',
          color: '#111111',
          maxWidth: '800px',
          marginBottom: isMobile ? '3rem' : '5rem',
        }}
      >
        <RevealLine index={0}>I LIKE BUILDING</RevealLine>
        <RevealLine index={1}>
          <span style={{ color: '#8A8A87' }}>THINGS THAT</span>
        </RevealLine>
        <RevealLine index={2}>ACTUALLY WORK.</RevealLine>
      </motion.h2>

      {/* Animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: '1px',
          background: 'rgba(17,17,17,0.15)',
          transformOrigin: 'left',
          marginBottom: isMobile ? '3rem' : '5rem',
        }}
        aria-hidden="true"
      />

      {/* Two-column content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: isMobile ? '2.5rem' : '5rem',
          alignItems: 'start',
        }}
      >
        {/* Left column – short statement */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#8A8A87',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '2rem',
            }}
          >
            Based in Pakistan<br />Available globally
          </p>

          {/* Stats / meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'FOCUS', value: 'Backend Systems' },
              { label: 'YEAR', value: '2026' },
              { label: 'STATUS', value: 'Available' },
            ].map(({ label, value }, i) => (
              <motion.div
                key={label}
                custom={4 + i}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(17,17,17,0.1)', paddingBottom: '0.75rem' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', color: '#8A8A87' }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#111111', fontWeight: 500 }}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column – philosophy */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '1.1rem' : 'clamp(1.1rem, 1.8vw, 1.55rem)',
              fontWeight: 300,
              lineHeight: 1.55,
              color: '#2a2a2a',
              marginBottom: '2rem',
              letterSpacing: '-0.01em',
            }}
          >
            I work across backend systems, APIs, databases and infrastructure, with a focus on turning complicated requirements into reliable, maintainable software.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '0.9rem' : '1rem',
              lineHeight: 1.7,
              color: '#666',
              marginBottom: '2.5rem',
            }}
          >
            I care about code that doesn't need explaining, systems that scale without drama, and interfaces that disappear into the experience. Engineering maturity means knowing which problems to solve and which to avoid.
          </p>

          <motion.a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-cta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#111111',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingBottom: '4px',
            }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            VIEW SELECTED WORK ↓
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
