import { useState, useEffect, useRef } from 'react'

const TYPED_PHRASES = [
  'building things for the web',
  'crafting clean interfaces',
  'exploring workforce AI solutions',
  'taking on full-stack freelance work',
  'coordinating projects at The Access Group',
  'shooting weddings since 2018',
  'designing jerseys for Blugrafix',
  'shipping side projects',
]

function useTypewriter(phrases: string[], typingSpeed = 55, pauseMs = 1800, deleteSpeed = 30) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseMs)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % phrases.length)
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, pauseMs, deleteSpeed])

  return text
}

const STATS = [
  { value: '7+',   label: 'yrs freelancing' },
  { value: '2',    label: 'businesses' },
  { value: '3',    label: 'active projects' },
  { value: '3.76', label: 'cgpa' },
]

const QUOTES = [
  { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupéry' },
]

// Animated counter stat card
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
        const suffix = value.replace(/[0-9.]/g, '')
        const isDecimal = value.includes('.')
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = numeric * eased
          setDisplay((isDecimal ? current.toFixed(2) : Math.round(current).toString()) + suffix)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div
      ref={ref}
      className="border border-[var(--border)] rounded-xl p-4 text-center hover:border-[var(--border-hover)] transition-colors duration-150"
      style={{ background: 'rgba(var(--bg-rgb),0.6)' }}
    >
      <p className="text-xl font-semibold" style={{
        background: 'linear-gradient(135deg, #f0f0db, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{display}</p>
      <p className="text-[10px] uppercase tracking-widest text-[var(--text-sec)] mt-1">{label}</p>
    </div>
  )
}

const terminal = [
  { prompt: '$ whoami',      out: 'amirul hakimi — cs student · frontend dev · designer · photographer' },
  { prompt: '$ cat role.txt', out: 'intern @ The Access Group APAC · Associate Project Coordinator' },
  { prompt: '$ cat building.txt', out: 'QR Attendance FYP · VoltaList · PapVision (freelance) · Blugrafix · more side projects' },
  { prompt: '$ cat open_to.txt', out: 'workforce AI · AI engineering · full-stack freelance · frontend roles · freelance design · photography gigs' },
]

export default function About() {
  const typed = useTypewriter(TYPED_PHRASES)
  return (
    <div className="space-y-10">

      {/* Cover + Avatar */}
      <header className="fade-up fade-up-1">
        <div className="relative h-40 rounded-xl overflow-hidden">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, var(--bg) 0%, #1e2d4a 40%, #0c2a3a 100%)',
          }} />
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: 'radial-gradient(circle, rgba(172,186,196,0.35) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 25% 70%, rgba(240,240,219,0.15) 0%, transparent 55%)',
          }} />
          <img
            src="/cover.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to top, rgba(var(--bg-rgb),0.7), transparent)' }} />
        </div>

        {/* Avatar + socials row */}
        <div className="relative z-10 -mt-20 px-1 mb-4">
          {/* Top row: avatar always left, fan cards on right (all screen sizes) */}
          <div className="flex items-end justify-between gap-3">
            <img
              src="/avatar.jpg"
              alt="Amirul Hakimi"
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[var(--bg)] object-cover bg-[var(--border)] shrink-0"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement
                el.src = "https://placehold.co/96x96/3a4060/acbac4?text=AH"
              }}
            />

            {/* Fan cards — always top-right */}
            <div className="flex items-center gap-1.5 pb-1">
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]/60">
                <img src="/arsenal.png" alt="Arsenal" className="w-8 h-5 sm:w-12 sm:h-7 object-contain shrink-0" />
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-[var(--text-pri)] leading-none">Arsenal FC</p>
                  <p className="text-[10px] text-[var(--text-sec)]">die-hard gooner</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]/60">
                <img src="/merccedes.png" alt="Mercedes" className="w-8 h-5 sm:w-12 sm:h-7 object-contain shrink-0" />
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-[var(--text-pri)] leading-none">Mercedes F1</p>
                  <p className="text-[10px] text-[var(--text-sec)]">silver arrows</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social icons — below avatar on all screen sizes */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {[
              {
                label: 'GitHub',
                href: 'https://github.com/amrlhakimii',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/amrlhakimii/',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                label: 'X / Twitter',
                href: 'https://x.com',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
              },
              {
                label: 'Instagram',
                href: 'https://instagram.com/amrlhakimii',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                ),
              },
              {
                label: 'Email',
                href: 'mailto:amirulxhakimi@gmail.com',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text-pri)] transition-all duration-150 hover:scale-110"
                style={{
                  background: 'rgba(var(--border-rgb),0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Name + status badge */}
        <div className="flex items-start gap-2">
          <h1 className="text-2xl leading-snug text-[var(--text-pri)]" style={{ fontFamily: "'Minecraft', monospace" }}>
            hi, my name is{' '}
            <span style={{
              background: 'linear-gradient(270deg, #f9a8d4 0%, #d8b4fe 40%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              amirul hakimi
            </span>
            .
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <p className="text-[var(--text-sec)] text-sm">
            software engineer · malaysia ·{' '}
            <span className="text-[var(--text-pri)]">{typed}</span>
            <span className="inline-block w-0.5 h-3.5 bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
          </p>
          {/* Live status badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium text-emerald-300 border border-emerald-500/20 bg-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            interning @ The Access Group · Mar–Jul 2026
          </span>
        </div>
      </header>

      {/* Stats row — animated counters */}
      <section className="fade-up fade-up-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map(({ value, label }) => (
            <AnimatedStat key={label} value={value} label={label} />
          ))}
        </div>
      </section>

      {/* Terminal block */}
      <section className="fade-up fade-up-3">
        <div
          className="rounded-xl overflow-hidden border border-[var(--border)]"
          style={{ background: 'rgba(10,15,28,0.8)', backdropFilter: 'blur(8px)' }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] text-[#606880]" style={{ fontFamily: 'monospace' }}>zsh — amrlhakimii</span>
          </div>
          <div className="px-4 py-4 space-y-3">
            {terminal.map(({ prompt, out }) => (
              <div key={prompt}>
                <p className="text-xs text-[#f0f0db]" style={{ fontFamily: 'monospace' }}>{prompt}</p>
                <p className="text-xs text-[#acbac4] mt-0.5 pl-2" style={{ fontFamily: 'monospace' }}>→ {out}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Now playing */}
      <section className="fade-up fade-up-4">
        <div
          className="flex items-center gap-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-4 transition-colors duration-150"
          style={{ background: 'rgba(var(--bg-rgb),0.6)' }}
        >
          {/* Album art */}
          <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
            <img src="/am.jpg" alt="Album art" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-lg border border-[var(--accent)]/30" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-0.5">currently listening</p>
            <p className="text-sm font-medium text-[var(--text-pri)] truncate">Mardy Bum</p>
            <p className="text-xs text-[var(--text-sec)] truncate">Arctic Monkeys · Whatever People Say, That's What I'm Not</p>
          </div>
          {/* Sound bars */}
          <div className="flex items-end gap-0.5 h-5 shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-[var(--accent)]"
                style={{
                  animation: `soundBar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                  height: '4px',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="fade-up fade-up-5 space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
          who i am
        </h2>
        <p className="text-[var(--text-sec)] leading-relaxed text-sm">
          I'm a final-year Bachelor of Computer Science (Hons.) student at UiTM Tapah, currently
          interning as an Associate Project Coordinator at <span className="text-[var(--text-pri)]">The Access Group APAC</span>. I graduated with
          First Class Honours in my Diploma of Computer Science (CGPA 3.54) and am on track to
          finish my degree with a <span className="text-[var(--text-pri)]">CGPA of 3.76</span>.
        </p>
        <p className="text-[var(--text-sec)] leading-relaxed text-sm">
          On the tech side, I build with <span className="text-[var(--text-pri)]">React, TypeScript, React Native, and Node.js</span> — ranging
          from mobile apps to web platforms. My final year project is a QR-based attendance system
          for UiTM students, built with React Native (iOS) and a React web dashboard backed by MySQL
          and Firebase. Increasingly, my focus is shifting toward <span className="text-[var(--text-pri)]">AI-powered tooling</span> — prompt engineering,
          LLM integration, and building products where AI does meaningful work rather than just autocomplete.
        </p>
        <p className="text-[var(--text-sec)] leading-relaxed text-sm">
          Before this, I interned at <span className="text-[var(--text-pri)]">Rev Media Group & Media Prima</span>, where I edited OBTV — a
          5-minute TV show on TV9 — and worked as videographer and gaffer for OhBulan!'s YouTube
          podcast. I was also the official photographer for VOCKET at events like Hausboom Music
          2023 and Aina Abdul's solo concert press conference.
        </p>
        <p className="text-[var(--text-sec)] leading-relaxed text-sm">
          Creatively, I've been freelancing since before uni. I run <span className="text-[var(--text-pri)]">Blugrafix</span>, my own graphic
          design and jersey sublimation printing business, and I've been shooting weddings,
          corporate events, and product launches as a freelance photographer since 2018. I also
          volunteered as a designer for Youths.My for over four years.
        </p>
        <p className="text-[var(--text-sec)] leading-relaxed text-sm">
          I speak Malay, English, Bahasa Indonesia, and some Mandarin. Off the screen, you'll find
          me watching <span className="text-[var(--text-pri)]">Arsenal</span> grind out a last-minute winner or obsessing over <span className="text-[var(--text-pri)]">Mercedes'</span> latest
          race strategy.
        </p>
      </section>

      <section className="fade-up fade-up-6 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
          what i build
        </h2>
        <ul className="space-y-2">
          {[
            'full-stack freelance projects — client work from PRD to deployment',
            'web and mobile apps with React, React Native, and TypeScript',
            'backend APIs with Node.js, MySQL, and Supabase',
            'ai-powered workflows — prompt engineering, PRD drafting with AI, and integrating LLMs into the build process',
            'graphic designs, jerseys, and print-ready artwork via Blugrafix',
            'small utilities that scratch my own itch',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-sec)]">
              <span className="shrink-0 mt-0.5" style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '11px' }}>›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Blugrafix card */}
      <section className="fade-up fade-up-6">
        <div
          className="rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-5 flex items-center justify-between gap-4 transition-colors duration-150"
          style={{ background: 'rgba(var(--bg-rgb),0.6)' }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ fontFamily: 'monospace', color: '#f9a8d4', background: 'rgba(249,168,212,0.1)', border: '1px solid rgba(249,168,212,0.2)' }}>BG</span>
              <p className="text-sm font-medium text-[var(--text-pri)]">Blugrafix</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">founder</span>
            </div>
            <p className="text-xs text-[var(--text-sec)] leading-relaxed">
              My own graphic design & jersey sublimation printing business — from client brief to final print-ready artwork. Running since 2019.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-[var(--muted)]">est.</p>
            <p className="text-lg font-semibold text-[var(--border-hover)]">2019</p>
          </div>
        </div>
      </section>

      <section className="fade-up fade-up-7 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
          stack
        </h2>
        <div className="space-y-2 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          {/* Row 1 — scrolls left */}
          {(() => {
            const row = ['React', 'React Native', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++', 'PHP', 'MySQL', 'Firebase', 'Supabase', 'Expo']
            const items = [...row, ...row]
            return (
              <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeLeft 28s linear infinite', gap: '8px' }}>
                {items.map((t, i) => (
                  <span key={i} className="text-xs text-[var(--text-sec)] border border-[var(--border)] px-2 py-1 rounded whitespace-nowrap shrink-0">
                    {t}
                  </span>
                ))}
              </div>
            )
          })()}
          {/* Row 2 — scrolls right */}
          {(() => {
            const row = ['TailwindCSS', 'Vite', 'Git', 'React Router', 'Framer Motion', 'REST APIs', 'Prompt Engineering', 'Claude AI', 'GitHub Copilot', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Lightroom', 'Canva', 'Figma']
            const items = [...row, ...row]
            return (
              <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeRight 32s linear infinite', gap: '8px' }}>
                {items.map((t, i) => (
                  <span key={i} className="text-xs text-[var(--text-sec)] border border-[var(--border)] px-2 py-1 rounded whitespace-nowrap shrink-0">
                    {t}
                  </span>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      <section className="fade-up fade-up-8 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
          interests
        </h2>
        <div className="space-y-2 text-sm text-[var(--text-sec)] leading-relaxed">
          <p>
            On the tech side: <span className="text-[var(--text-pri)]">frontend engineering</span>, building mobile apps, and tinkering with AI/ML tools.
            I enjoy the craft of making interfaces feel fast, clean, and intentional.
          </p>
          <p>
            Creatively: <span className="text-[var(--text-pri)]">photography</span> has been a big part of my life since school — I shoot weddings,
            events, and products, and I genuinely love the process of finding the right frame. <span className="text-[var(--text-pri)]">Graphic
            design</span> runs alongside that, from brand identities to jersey sublimation artwork via Blugrafix.
            I also mess around in After Effects more than I probably should.
          </p>
          <p>
            Culturally: I follow <span className="text-[var(--text-pri)]">Arsenal</span> religiously — the kind of fan that watches every match,
            checks the lineup 30 minutes before kickoff, and feels physical pain during injury time.
            I also follow <span className="text-[var(--text-pri)]">Formula 1</span> closely, specifically Mercedes AMG Petronas. The overlap between
            race strategy, engineering, and split-second decision-making genuinely fascinates me.
          </p>
          <p>
            Other things I enjoy: good playlists, discovering new music, and <span className="text-[var(--text-pri)]">videography</span> — especially
            the editing side. I find the narrative structure of a well-cut video as satisfying as shipping
            clean code.
          </p>
        </div>
      </section>

      {/* Work with me */}
      <section className="fade-up fade-up-9 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
          <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
          work with me
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { code: 'AI', color: '#e879f9', title: 'AI Engineering', desc: 'Prompt engineering, LLM integration, AI-powered workflows and tooling' },
            { code: 'FS', color: '#60a5fa', title: 'Full-Stack Dev', desc: 'React, TypeScript, Node.js, Supabase, Firebase — web or mobile, end to end' },
            { code: 'GD', color: '#f9a8d4', title: 'Graphic Design', desc: 'Branding, social media, print, jersey artwork' },
            { code: 'PH', color: '#e1d9bc', title: 'Photography', desc: 'Weddings, events, products, corporate shoots' },
          ].map(({ code, color, title, desc }) => (
            <div
              key={title}
              className="border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl p-4 space-y-1.5 transition-colors duration-150"
              style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
            >
              <p
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded w-fit"
                style={{ fontFamily: 'monospace', color, background: `${color}18`, border: `1px solid ${color}30` }}
              >{code}</p>
              <p className="text-sm font-medium text-[var(--text-pri)]">{title}</p>
              <p className="text-xs text-[var(--text-sec)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--text-sec)]">
          Reach out at{' '}
          <a href="mailto:amirulxhakimi@gmail.com" className="text-[var(--accent)] hover:underline">
            amirulxhakimi@gmail.com
          </a>{' '}
          or on{' '}
          <a href="https://www.linkedin.com/in/amrlhakimii/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            LinkedIn
          </a>.
        </p>
      </section>

      {/* Random quote — refreshes each visit */}
      <RandomQuote />

    </div>
  )
}

function RandomQuote() {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  return (
    <section className="fade-up fade-up-9">
      <div
        className="rounded-xl border border-[var(--border)] p-5 relative overflow-hidden"
        style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
      >
        <div className="absolute top-2 left-4 text-5xl text-[var(--border)] select-none font-serif leading-none">"</div>
        <blockquote className="relative z-10 pl-4">
          <p className="text-sm text-[var(--text-sec)] leading-relaxed italic">{quote.text}</p>
          {quote.author && (
            <p className="text-xs text-[var(--muted)] mt-2">— {quote.author}</p>
          )}
        </blockquote>
        <p className="text-[10px] uppercase tracking-widest text-[#505870] mt-3 text-right">refreshes each visit</p>
      </div>
    </section>
  )
}
