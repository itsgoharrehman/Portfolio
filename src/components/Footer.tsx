import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <footer
      ref={ref}
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Site footer"
    >
      {/* Animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(199,255,74,0.4), transparent)',
          transformOrigin: 'left',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 3rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            color: '#8A8A87',
            textTransform: 'uppercase',
          }}
        >
          GOHAR REHMAN
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            color: 'rgba(138,138,135,0.5)',
            textTransform: 'uppercase',
          }}
        >
          SOFTWARE ENGINEER
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            color: 'rgba(138,138,135,0.5)',
          }}
        >
          © 2026
        </motion.span>
      </div>
    </footer>
  )
}
