import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useTypewriter } from '../hooks/useTypewriter'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.95,
      ease: EASE_OUT_EXPO,
    },
  }),
}

const metaVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.12,
      duration: 0.65,
      ease: EASE_OUT_EXPO,
    },
  }),
}

function HeroLine({ text, index }: { text: string; index: number }) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
      <motion.div
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'block' }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const scrambled = useTypewriter({
    text: 'SOFTWARE ENGINEER / BACKEND / SYSTEMS',
    scramble: true,
    duration: 1600,
    delay: 300,
    trigger: true,
  })

  const { scrollY } = useScroll()
  const rawOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const rawY = useTransform(scrollY, [0, 500], [0, -60])
  const opacity = useSpring(rawOpacity, { stiffness: 300, damping: 40 })
  const y = useSpring(rawY, { stiffness: 300, damping: 40 })

  return (
    <section
      id="hero"
      data-section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: isMobile ? '6rem' : '7.5rem',
      }}
      aria-label="Hero section"
    >
      {/* Sleek Dark Ambient Atmosphere — No random stock videos or green hacker lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(199, 255, 74, 0.05), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 60%, rgba(255, 255, 255, 0.02), transparent 80%), #080808',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtle Architectural Grid Pattern (Ultra clean & minimal) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Main Hero Content */}
      <motion.div
        style={{
          opacity,
          y,
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '1.5rem 1.5rem 1rem' : '2rem 3.5rem 1.5rem',
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Technical metadata label */}
        <motion.div
          custom={0}
          variants={metaVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            color: '#C7FF4A',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
          }}
          aria-label="Software Engineer - Backend Systems"
        >
          <span className="accent-dot accent-dot-pulse" aria-hidden="true" />
          <span>{scrambled}</span>
        </motion.div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: isMobile ? 'clamp(3.2rem, 13vw, 5.5rem)' : 'clamp(4.5rem, 9.5vw, 8.8rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            color: '#F5F5F3',
            maxWidth: '92vw',
            margin: 0,
          }}
        >
          <HeroLine text="I BUILD" index={0} />
          <HeroLine text="SYSTEMS" index={1} />
          <div style={{ overflow: 'hidden', lineHeight: 0.9 }}>
            <motion.div
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 'clamp(1.4rem, 6.5vw, 2.5rem)' : 'clamp(1.8rem, 3.8vw, 3.6rem)',
                color: 'rgba(245,245,243,0.55)',
                letterSpacing: '-0.03em',
                marginTop: '0.75rem',
              }}
            >
              THAT MOVE THE WEB FORWARD.
            </motion.div>
          </div>
        </h1>
      </motion.div>

      {/* Hero Bottom Information Bar (Clean separation, No collision) */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: isMobile ? '1.5rem' : '1.5rem 3.5rem 2.5rem',
          opacity,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: 'auto',
        }}
        aria-label="Portfolio details"
      >
        {/* Bottom left */}
        <motion.div
          custom={0}
          variants={metaVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: 'rgba(245,245,243,0.65)',
              lineHeight: 1.8,
              textTransform: 'uppercase',
            }}
          >
            <div style={{ color: '#F5F5F3', fontWeight: 500 }}>SOFTWARE ENGINEER</div>
            {!isMobile && (
              <>
                <div>FOCUSED ON BACKEND SYSTEMS,</div>
                <div>APIs & INFRASTRUCTURE</div>
              </>
            )}
          </div>
        </motion.div>

        {/* Bottom right availability */}
        <motion.div
          custom={1}
          variants={metaVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: 'rgba(245,245,243,0.65)',
              lineHeight: 1.8,
              textTransform: 'uppercase',
              textAlign: 'right',
            }}
          >
            {!isMobile && <div>AVAILABLE FOR SELECTED</div>}
            <div>OPPORTUNITIES — 2026</div>
            <div
              style={{
                color: '#C7FF4A',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                justifyContent: 'flex-end',
                marginTop: '2px',
                fontWeight: 500,
              }}
            >
              <span className="accent-dot accent-dot-pulse" aria-hidden="true" />
              <span>AVAILABLE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
