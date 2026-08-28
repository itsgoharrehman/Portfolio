import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface ProjectData {
  number: string
  title: string
  subtitle: string
  category: string
  year: string
  tech: string[]
  description: string
  imageUrl: string
  layout: 'large' | 'horizontal' | 'vertical'
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    title: 'DIGINIXIT',
    subtitle: 'DIGITAL PLATFORM',
    category: 'FULL STACK',
    year: '2026',
    tech: ['React', 'TypeScript', 'Cloudflare', 'PostgreSQL'],
    description: 'A comprehensive digital platform built for scale — real-time data pipelines, edge-deployed APIs, and a React frontend that handles complex state without compromising performance.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80',
    layout: 'large',
  },
  {
    number: '02',
    title: 'MARK',
    subtitle: 'AI ASSISTANT',
    category: 'BACKEND SYSTEM',
    year: '2026',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    description: 'Backend architecture for an AI assistant — designed around event-driven patterns, context management, and low-latency inference pipelines.',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=80',
    layout: 'horizontal',
  },
  {
    number: '03',
    title: 'API / INFRASTRUCTURE',
    subtitle: 'PLATFORM ENGINEERING',
    category: 'SYSTEMS',
    year: '2025',
    tech: ['Docker', 'Linux', 'Node.js', 'Nginx'],
    description: 'Modular infrastructure toolkit — containerized microservices, automated deployment pipelines, and a RESTful API layer designed for reliability under load.',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1400&q=80',
    layout: 'vertical',
  },
]

function ProjectLarge({ project, isInView }: { project: ProjectData; isInView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      data-cursor-label="VIEW CASE STUDY ↗"
      style={{
        position: 'relative',
        marginBottom: '5rem',
        cursor: 'none',
      }}
    >
      {/* Project number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <motion.h3
          animate={hovered ? { x: 6 } : { x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#F5F5F3',
            lineHeight: 1,
          }}
        >
          {project.title}
        </motion.h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: '#8A8A87',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main visual */}
      <div
        className="project-visual"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '2px',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}
      >
        <motion.img
          src={project.imageUrl}
          alt={`${project.title} project visual`}
          loading="lazy"
          animate={hovered ? { scale: 1.04 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Overlay on hover */}
        <motion.div
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8,8,8,0.25)',
          }}
        />
      </div>

      {/* Metadata bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '1.5rem',
          gap: '2rem',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: project.number },
            { label: project.subtitle },
            { label: project.category },
            { label: project.year },
          ].map(({ label }) => (
            <span
              key={label}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                color: '#8A8A87',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <motion.div
          animate={hovered ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: '#C7FF4A',
          }}
        >
          VIEW CASE STUDY ↗
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProjectHorizontal({ project, isInView }: { project: ProjectData; isInView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2rem' : '4rem',
        alignItems: 'center',
        marginBottom: '5rem',
        cursor: 'none',
      }}
    >
      {/* Left: Content */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: '#C7FF4A',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: '#8A8A87' }}>{project.number}</span>
          <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#8A8A87' }} aria-hidden="true" />
          {project.category}
        </div>
        <motion.h3
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#F5F5F3',
            lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}
        >
          {project.title}
        </motion.h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.65,
            color: '#8A8A87',
            marginBottom: '2rem',
            maxWidth: '380px',
          }}
        >
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.14em',
                color: '#8A8A87',
                border: '1px solid rgba(138,138,135,0.25)',
                padding: '0.25rem 0.6rem',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Image */}
      <div
        className="project-visual"
        style={{
          aspectRatio: '4/3',
          borderRadius: '2px',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}
      >
        <motion.img
          src={project.imageUrl}
          alt={`${project.title} visual`}
          loading="lazy"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </motion.div>
  )
}

function ProjectVertical({ project, isInView }: { project: ProjectData; isInView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      style={{
        marginBottom: '3rem',
        cursor: 'none',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? '2rem' : '5rem',
          alignItems: 'end',
          marginBottom: '2rem',
        }}
      >
        <motion.h3
          animate={hovered ? { letterSpacing: '-0.02em' } : { letterSpacing: '-0.04em' }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            textTransform: 'uppercase',
            color: '#F5F5F3',
            lineHeight: 0.9,
          }}
        >
          {project.title}
        </motion.h3>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6, color: '#8A8A87', marginBottom: '1rem' }}>
            {project.description}
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: '#8A8A87' }}>
            {project.year} — {project.category}
          </div>
        </div>
      </div>

      <div
        className="project-visual"
        style={{
          width: '100%',
          aspectRatio: isMobile ? '4/3' : '21/9',
          borderRadius: '2px',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}
      >
        <motion.img
          src={project.imageUrl}
          alt={`${project.title} infrastructure visual`}
          loading="lazy"
          animate={hovered ? { scale: 1.04 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Tech labels overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {project.tech.map((t) => (
            <motion.span
              key={t}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.14em',
                color: '#F5F5F3',
                background: 'rgba(8,8,8,0.7)',
                backdropFilter: 'blur(4px)',
                padding: '0.2rem 0.5rem',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Work() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const projectNum = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 1, 2, 3])

  return (
    <section
      id="work"
      data-section
      ref={ref}
      style={{
        background: '#080808',
        padding: isMobile ? '5rem 1.5rem' : '8rem 3rem',
        position: 'relative',
      }}
      aria-label="Selected work section"
    >
      {/* Sticky project counter */}
      {!isMobile && (
        <div
          style={{
            position: 'sticky',
            top: '5rem',
            float: 'right',
            zIndex: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            color: '#8A8A87',
            marginBottom: '-2rem',
          }}
          aria-hidden="true"
        >
          <motion.span style={{ display: 'inline-block' }}>
            {projectNum.get().toFixed(0).padStart(2, '0')} / 03
          </motion.span>
        </div>
      )}

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
          style={{
            display: 'inline-block',
            width: '20px',
            height: '1px',
            background: '#C7FF4A',
          }}
          aria-hidden="true"
        />
        02 / SELECTED WORK
      </motion.div>

      {/* Section heading */}
      <div style={{ marginBottom: isMobile ? '3rem' : '6rem' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#F5F5F3',
            }}
          >
            SELECTED
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: 'rgba(245,245,243,0.2)',
            }}
          >
            WORK.
          </motion.span>
        </div>
      </div>

      {/* Projects */}
      <div style={{ clear: 'both' }}>
        <ProjectLarge project={PROJECTS[0]} isInView={isInView} />
        <ProjectHorizontal project={PROJECTS[1]} isInView={isInView} />
        <ProjectVertical project={PROJECTS[2]} isInView={isInView} />
      </div>
    </section>
  )
}
