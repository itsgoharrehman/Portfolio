import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const EXPERIENCES = [
  {
    year: '2026',
    role: 'PYTHON DEVELOPMENT',
    company: 'DECODELABS',
    description: 'Building scalable backend services and data pipelines with Python. API design, system architecture, and production deployments.',
  },
  {
    year: '2025',
    role: 'SOFTWARE ENGINEERING',
    company: 'GCUF',
    description: 'Computer Science studies with deep focus on algorithms, systems programming, and software engineering fundamentals.',
  },
  {
    year: '2023',
    role: 'WEB DEVELOPMENT',
    company: 'BEGINNING',
    description: 'Started the journey with web technologies — HTML, CSS, JavaScript. Built foundations that grew into full-stack capability.',
  },
]

function ExperienceEntry({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
}) {
  const entryRef = useRef<HTMLDivElement>(null)
  const entryInView = useInView(entryRef, { once: true, margin: '-20% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <motion.div
      ref={entryRef}
      initial={{ opacity: 0, x: -24 }}
      animate={entryInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE_OUT_EXPO }}
      style={{
        position: 'relative',
        marginBottom: index < EXPERIENCES.length - 1 ? (isMobile ? '3rem' : '4rem') : 0,
      }}
    >
      {/* Dot on timeline */}
      <motion.div
        animate={entryInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
        style={{
          position: 'absolute',
          left: isMobile ? '-1.75rem' : '-3.25rem',
          top: '0.4rem',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#C7FF4A',
          boxShadow: '0 0 8px rgba(199,255,74,0.4)',
        }}
        aria-hidden="true"
      />

      {/* Year label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#8A8A87',
          marginBottom: '0.5rem',
        }}
      >
        {exp.year}
      </div>

      {/* Role */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#111111',
          marginBottom: '0.25rem',
          lineHeight: 1.1,
        }}
      >
        {exp.role}
      </div>

      {/* Company / Organization in razor-sharp green with clean thin black outline */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          letterSpacing: '0.22em',
          color: '#C7FF4A',
          WebkitTextStroke: '1px #080808',
          paintOrder: 'stroke fill',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            background: '#C7FF4A',
            borderRadius: '50%',
            border: '1px solid #080808',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
        {exp.company}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.65,
          color: '#666',
          maxWidth: '480px',
        }}
      >
        {exp.description}
      </p>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="experience"
      data-section
      ref={ref}
      style={{
        background: '#F1F0EC',
        color: '#111111',
        padding: isMobile ? '5rem 1.5rem' : '8rem 3rem',
        position: 'relative',
      }}
      aria-label="Experience section"
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
        04 / EXPERIENCE
      </motion.div>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? '3rem' : '5rem' }}>
        {['THE ROAD', 'SO FAR.'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ delay: i * 0.1, duration: 0.9, ease: EASE_OUT_EXPO }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: i === 1 ? '#8A8A87' : '#111111',
                margin: 0,
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        style={{
          position: 'relative',
          paddingLeft: isMobile ? '1.5rem' : '3rem',
          maxWidth: '800px',
        }}
      >
        {/* Animated vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(17,17,17,0.1)',
          }}
          aria-hidden="true"
        >
          <motion.div
            style={{
              width: '100%',
              height: lineHeight,
              background: '#111111',
              transformOrigin: 'top',
            }}
          />
        </div>

        {/* Entries — each is its own component to allow per-entry hooks */}
        {EXPERIENCES.map((exp, i) => (
          <ExperienceEntry key={exp.year} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
