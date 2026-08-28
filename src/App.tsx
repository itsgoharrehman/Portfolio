import { useState } from 'react'
import './index.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SectionTransition } from './components/SectionTransition'
import { About } from './components/About'
import { Work } from './components/Work'
import { Stack } from './components/Stack'
import { Experience } from './components/Experience'
import { Philosophy } from './components/Philosophy'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Preloader } from './components/Preloader'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Next-Level Preloader Experience */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* 01 — Cinematic Hero */}
        <Hero />

        {/* Typographic transition: ENGINEERED / NOT DECORATED. */}
        <SectionTransition />

        {/* 02 — Editorial About */}
        <About />

        {/* 03 — Selected Work */}
        <Work />

        {/* 04 — Technical Stack */}
        <Stack />

        {/* 05 — Experience Timeline */}
        <Experience />

        {/* 06 — Engineering Philosophy */}
        <Philosophy />

        {/* 07 — Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
