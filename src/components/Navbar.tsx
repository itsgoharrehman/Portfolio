import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const NAV_LINKS = ['WORK', 'ABOUT', 'STACK', 'EXPERIENCE']

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const

function NavLink({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
  onClick: (e: React.MouseEvent) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        position: 'relative',
        padding: '0.4rem 0.2rem',
        cursor: 'none',
      }}
      aria-label={`Navigate to ${label} section`}
    >
      <div
        style={{
          overflow: 'hidden',
          height: '16px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <motion.div
          animate={{ y: hovered ? -16 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              height: '16px',
              lineHeight: '16px',
              color: 'rgba(245,245,243,0.75)',
              display: 'block',
            }}
          >
            {label}
          </span>
          <span
            style={{
              height: '16px',
              lineHeight: '16px',
              color: '#C7FF4A',
              display: 'block',
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </motion.div>
      </div>

      {/* Subtle expanding accent underline */}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        style={{
          position: 'absolute',
          bottom: '1px',
          left: 0,
          right: 0,
          height: '1px',
          background: '#C7FF4A',
          transformOrigin: 'left',
        }}
        aria-hidden="true"
      />
    </a>
  )
}

const menuItemVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
  exit: (i: number) => ({
    y: -60,
    opacity: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: EASE_IN_OUT },
  }),
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.85rem 2.5rem' : '1.6rem 3rem',
          background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            cursor: 'none',
          }}
          aria-label="Gohar Rehman — Home"
        >
          {/* Signature Favicon Logo Mark */}
          <img
            src="/favicon.svg"
            alt="Gohar Rehman Logo"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'block',
              filter: 'drop-shadow(0 0 6px rgba(199, 255, 74, 0.45))',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'rgba(245,245,243,0.95)',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            GOHAR REHMAN
          </span>
        </a>

        {/* Center links – desktop only */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link}
                label={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link)
                }}
              />
            ))}
          </div>
        )}

        {/* Right CTA / Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {!isMobile && (
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
              className="btn-cta"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: 'rgba(245,245,243,0.9)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                paddingBottom: '2px',
                cursor: 'none',
              }}
            >
              LET'S TALK ↗
            </a>
          )}

          {/* Hamburger (Mobile only or toggle) */}
          {isMobile && (
            <button
              id="nav-hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '6px',
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: '#F5F5F3',
                  transformOrigin: 'center',
                }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: '#F5F5F3',
                }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: '#F5F5F3',
                  transformOrigin: 'center',
                }}
              />
            </button>
          )}
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Section label */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(138,138,135,0.7)',
                marginBottom: '3rem',
                display: 'block',
              }}
            >
              NAVIGATION
            </span>

            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[...NAV_LINKS, 'CONTACT'].map((link, i) => (
                  <li key={link} style={{ overflow: 'hidden' }}>
                    <motion.button
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => scrollTo(link)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'none',
                        display: 'block',
                        textAlign: 'left',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.04em',
                        textTransform: 'uppercase',
                        color: '#F5F5F3',
                        lineHeight: 1.1,
                        padding: '0.15em 0',
                        width: '100%',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                      aria-label={`Navigate to ${link}`}
                    >
                      <span
                        style={{
                          color: 'rgba(138,138,135,0.5)',
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.15em',
                          verticalAlign: 'middle',
                          marginRight: '1rem',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer of menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 'auto',
                paddingTop: '2rem',
                display: 'flex',
                gap: '1.5rem',
              }}
            >
              {['GITHUB', 'LINKEDIN', 'EMAIL'].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.18em',
                    color: 'rgba(138,138,135,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  {s}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
