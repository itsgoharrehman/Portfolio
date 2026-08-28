import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const STACK_CATEGORIES = [
  {
    name: 'LANGUAGES',
    items: ['Python', 'TypeScript', 'JavaScript'],
  },
  {
    name: 'BACKEND',
    items: ['FastAPI', 'Node.js', 'REST APIs'],
  },
  {
    name: 'DATABASE',
    items: ['PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    name: 'INFRASTRUCTURE',
    items: ['Docker', 'Linux', 'Redis', 'Cloudflare'],
  },
  {
    name: 'TOOLS',
    items: ['Git', 'GitHub', 'Vite', 'VS Code'],
  },
]

function StackRow({
  item,
  index,
  isInView,
}: {
  item: string
  index: number
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="stack-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        cursor: 'default',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <motion.span
          animate={hovered ? { color: '#C7FF4A' } : { color: '#8A8A87' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.16em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <motion.span
          animate={hovered ? { x: 6, color: '#F5F5F3' } : { x: 0, color: 'rgba(245,245,243,0.75)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {item}
        </motion.span>
      </div>

      <motion.div
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: '40px',
          height: '1px',
          background: '#C7FF4A',
          transformOrigin: 'left',
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export function Stack() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')
  let globalIndex = 0

  return (
    <section
      id="stack"
      data-section
      ref={ref}
      style={{
        background: '#0c0c0c',
        padding: isMobile ? '5rem 1.5rem' : '8rem 3rem',
        position: 'relative',
      }}
      aria-label="Technical stack section"
    >
      {/* Section marker */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
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
          style={{ display: 'inline-block', width: '20px', height: '1px', background: '#C7FF4A' }}
          aria-hidden="true"
        />
        03 / STACK
      </motion.div>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? '3rem' : '5rem' }}>
        {['THE TOOLS', 'BEHIND THE WORK.'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: i === 1 ? 'rgba(245,245,243,0.25)' : '#F5F5F3',
                margin: 0,
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* Stack grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '3rem 4rem' : '3rem 6rem',
          alignItems: 'start',
        }}
      >
        {STACK_CATEGORIES.map((cat) => {
          const catIndex = globalIndex
          globalIndex += cat.items.length
          return (
            <div key={cat.name}>
              {/* Category title */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: catIndex * 0.05, duration: 0.5 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  color: '#C7FF4A',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid rgba(199,255,74,0.2)',
                }}
              >
                {cat.name}
              </motion.div>

              {/* Items */}
              <div>
                {cat.items.map((item, itemIdx) => (
                  <StackRow
                    key={item}
                    item={item}
                    index={catIndex + itemIdx}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.14em',
          color: '#8A8A87',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        CONSTANTLY LEARNING. TOOLS EVOLVE, PRINCIPLES DON'T.
      </motion.p>
    </section>
  )
}
