import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [section, setSection] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)

      let currentSection = 0
      sections.forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          currentSection = i + 1
        }
      })
      setSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, section }
}
