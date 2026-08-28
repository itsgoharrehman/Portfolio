import { useScrollProgress } from '../hooks/useScrollProgress'
import { useMediaQuery } from '../hooks/useMediaQuery'

const SECTION_LABELS = ['01', '02', '03', '04', '05', '06', '07']

export function ScrollProgress() {
  const { progress, section } = useScrollProgress()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) return null

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          marginBottom: '8px',
          transition: 'color 0.3s ease',
        }}
      >
        {SECTION_LABELS[Math.max(0, section - 1)] || '00'}
      </span>

      {/* Track */}
      <div
        style={{
          width: '1px',
          height: '120px',
          background: 'rgba(255,255,255,0.1)',
          position: 'relative',
        }}
      >
        {/* Accent marker */}
        <div
          style={{
            position: 'absolute',
            left: '-2px',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#C7FF4A',
            top: `${Math.min(progress * 100, 96)}%`,
            transition: 'top 0.1s linear',
            boxShadow: '0 0 6px rgba(199,255,74,0.5)',
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${progress * 100}%`,
            background: 'rgba(199,255,74,0.3)',
            transition: 'height 0.1s linear',
          }}
        />
      </div>
    </div>
  )
}
