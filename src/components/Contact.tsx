import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="contact"
      data-section
      ref={ref}
      style={{
        background: '#080808',
        padding: isMobile ? '6rem 1.5rem 4rem' : '10rem 3rem 5rem',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Contact section"
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
          marginBottom: isMobile ? '2.5rem' : '5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{ display: 'inline-block', width: '20px', height: '1px', background: '#C7FF4A' }}
          aria-hidden="true"
        />
        07 / CONTACT
      </motion.div>

      {/* Main heading */}
      <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
        {['LET\'S BUILD', 'SOMETHING', 'USEFUL.'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '105%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ delay: i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: isMobile ? 'clamp(3rem, 11vw, 6rem)' : 'clamp(4rem, 10vw, 9rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                color: i === 2 ? 'rgba(245,245,243,0.25)' : '#F5F5F3',
                margin: 0,
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          color: '#8A8A87',
          textTransform: 'uppercase',
          marginBottom: isMobile ? '2.5rem' : '3.5rem',
          maxWidth: '500px',
        }}
      >
        AVAILABLE FOR SELECTED SOFTWARE ENGINEERING OPPORTUNITIES.
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.7 }}
        style={{ marginBottom: isMobile ? '3rem' : '5rem' }}
      >
        <a
          href="mailto:goharrehman@example.com"
          id="contact-cta"
          className="btn-cta"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: isMobile ? '1.2rem' : 'clamp(1.2rem, 2.5vw, 2rem)',
            letterSpacing: '-0.02em',
            color: '#F5F5F3',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            paddingBottom: '6px',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Send email to start a conversation"
        >
          {/* Text roll */}
          <span
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              height: '1.2em',
              verticalAlign: 'bottom',
            }}
          >
            <motion.span
              animate={hovered ? { y: '-100%' } : { y: '0%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block' }}
            >
              START A CONVERSATION
            </motion.span>
            <motion.span
              animate={hovered ? { y: '-100%' } : { y: '0%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block', color: '#C7FF4A' }}
            >
              START A CONVERSATION
            </motion.span>
          </span>

          {/* Arrow */}
          <motion.span
            animate={hovered ? { rotate: -45 } : { rotate: 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <ArrowUpRight size={isMobile ? 18 : 22} strokeWidth={1.5} />
          </motion.span>

          {/* Expanding underline */}
          <motion.span
            animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              background: '#C7FF4A',
              transformOrigin: 'left',
            }}
            aria-hidden="true"
          />
        </a>
      </motion.div>

      {/* Secondary links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.85, duration: 0.7 }}
        style={{
          display: 'flex',
          gap: isMobile ? '1.5rem' : '2.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {[
          {
            label: 'GITHUB',
            href: 'https://github.com',
            icon: <GithubIcon size={14} />,
          },
          {
            label: 'LINKEDIN',
            href: 'https://linkedin.com',
            icon: <LinkedinIcon size={14} />,
          },
          {
            label: 'EMAIL',
            href: 'mailto:goharrehman@example.com',
            icon: <Mail size={14} strokeWidth={1.5} />,
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={label !== 'EMAIL' ? '_blank' : undefined}
            rel={label !== 'EMAIL' ? 'noopener noreferrer' : undefined}
            className="btn-cta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: '#8A8A87',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              paddingBottom: '3px',
              transition: 'color 0.3s ease',
            }}
            aria-label={`Visit ${label}`}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#F5F5F3'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#8A8A87'
            }}
          >
            {icon}
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  )
}
