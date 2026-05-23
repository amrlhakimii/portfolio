import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────

const techTiers: Record<string, string[]> = {
  expert:     ['React.js', 'TypeScript', 'Expo', 'React Native', 'JavaScript', 'Java', 'REST APIs'],
  proficient: ['Node.js', 'Git', 'TailwindCSS', 'C++', 'MySQL', 'Firebase'],
  familiar:   ['Python', 'PHP', 'AI / ML'],
}

const designTiers: Record<string, string[]> = {
  expert:     ['Adobe Lightroom', 'Adobe Photoshop', 'Canva'],
  proficient: ['Adobe Illustrator', 'Figma', 'Adobe Premiere Pro'],
  familiar:   ['Adobe After Effects'],
}

const languages = [
  { lang: 'Malay',            level: 'Native',       pct: 100, flag: '🇲🇾' },
  { lang: 'English',          level: 'Native',       pct: 98,  flag: '🇬🇧' },
  { lang: 'Bahasa Indonesia', level: 'Fluent',        pct: 80,  flag: '🇮🇩' },
  { lang: 'Mandarin',         level: 'Intermediate', pct: 45,  flag: '🇨🇳' },
]

const funFacts = [
  '📷 Shot my first paid wedding at 16',
  '🎽 Runs a sublimation printing business (Blugrafix)',
  '⚽ Checks Arsenal lineup 30 min before every match',
  '🏎️ Could explain DRS rules at 3am',
  '🎬 Directed a 5-min TV show on TV9',
  '💻 Built this portfolio in React + TypeScript',
  '📺 Was the gaffer & video editor for OhBulan! YouTube',
  '🇲🇾 Speaks 4 languages',
  '🎓 First Class Honours in Diploma CS (CGPA 3.54)',
  '🌙 Does best work after midnight',
]

const identity = [
  { label: 'name',      value: 'Amirul Hakimi Bin Abdullah Sani' },
  { label: 'alias',     value: 'kimi · amrlhakimii' },
  { label: 'based',     value: 'Jitra, Kedah, Malaysia 🇲🇾' },
  { label: 'role',      value: 'CS Student · Frontend Dev · Designer · Photographer' },
  { label: 'currently', value: 'Semester 7 · CGPA 3.76 · Intern @ The Access Group APAC' },
  { label: 'email',     value: 'amirulxhakimi@gmail.com', href: 'mailto:amirulxhakimi@gmail.com' },
]

// ── Fun fact carousel ─────────────────────────────────────────────────────────
function FunFactCarousel() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  const next = () => {
    setFading(true)
    setTimeout(() => { setIdx(i => (i + 1) % funFacts.length); setFading(false) }, 200)
  }
  const prev = () => {
    setFading(true)
    setTimeout(() => { setIdx(i => (i - 1 + funFacts.length) % funFacts.length); setFading(false) }, 200)
  }

  useEffect(() => {
    const t = setInterval(next, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative rounded-xl border border-[var(--border)] p-5 flex items-center gap-4"
      style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
    >
      <button onClick={prev} className="text-[var(--border-hover)] hover:text-[var(--text-sec)] transition-colors duration-150 shrink-0 text-lg">‹</button>
      <div className="flex-1 text-center min-h-[2rem] flex items-center justify-center">
        <p
          className="text-sm text-[var(--text-pri)] transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {funFacts[idx]}
        </p>
      </div>
      <button onClick={next} className="text-[var(--border-hover)] hover:text-[var(--text-sec)] transition-colors duration-150 shrink-0 text-lg">›</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {funFacts.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full transition-colors duration-200"
            style={{ background: i === idx ? 'var(--accent)' : 'var(--border)' }} />
        ))}
      </div>
    </div>
  )
}

// ── Language bar ──────────────────────────────────────────────────────────────
function LangBar({ lang, level, pct, flag }: { lang: string; level: string; pct: number; flag: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setWidth(pct), 150); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-pri)] flex items-center gap-2">{flag} {lang}</span>
        <span className="text-xs text-[var(--text-sec)] border border-[var(--border)] px-2 py-0.5 rounded-full">{level}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(var(--border-rgb),0.5)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: 'linear-gradient(90deg, var(--muted), var(--text-pri))' }}
        />
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Profile() {
  const [skillTab, setSkillTab] = useState<'tech' | 'design'>('tech')

  // Local time in Malaysia
  const [myTime, setMyTime] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setMyTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const myTimeStr = myTime.toLocaleTimeString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
  const myHour = parseInt(myTime.toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', hour12: false }))
  const timeStatus = myHour >= 22 || myHour < 6
    ? '🌙 probably asleep'
    : myHour >= 6 && myHour < 12
    ? '☀️ morning grind'
    : myHour >= 12 && myHour < 18
    ? '💻 working'
    : '🌆 late afternoon'

  return (
    <div className="space-y-8">
      <header className="fade-up fade-up-1">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3" style={{ letterSpacing: "-0.02em", lineHeight: "1" }}>Profile</h1>
        <p className="text-[var(--text-sec)] text-sm">the full picture — who, what, where, and why</p>
      </header>

      {/* Identity card */}
      <section className="fade-up fade-up-2">
        <div
          className="rounded-2xl border border-[var(--border)] overflow-hidden"
          style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
        >
          {/* Card header stripe */}
          <div
            className="px-5 py-3 flex items-center justify-between border-b border-[var(--border)]"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">identity card</span>
            </div>
            <span className="text-[10px] text-[var(--muted)]">🪪 kimi.dev</span>
          </div>

          <div className="p-5 space-y-3">
            {identity.map(({ label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] w-20 shrink-0 pt-0.5">{label}</span>
                {href ? (
                  <a href={href} className="text-sm text-[var(--accent)] hover:underline">{value}</a>
                ) : (
                  <span className="text-sm text-[var(--text-pri)]">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local time + status */}
      <section className="fade-up fade-up-3">
        <div
          className="rounded-xl border border-[var(--border)] px-5 py-4 flex items-center justify-between"
          style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">local time — Jitra, Kedah (MYT)</p>
            <p className="text-2xl font-semibold text-[var(--accent)] tabular-nums" style={{ fontFamily: 'monospace' }}>{myTimeStr}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-sec)]">{timeStatus}</p>
            <p className="text-[10px] text-[var(--border-hover)] mt-1">UTC +8:00</p>
          </div>
        </div>
      </section>

      {/* Fun facts carousel */}
      <section className="fade-up fade-up-4 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2"><span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>fun facts</h2>
        <div className="relative">
          <FunFactCarousel />
        </div>
        <p className="text-[10px] text-[var(--border-hover)]">auto-cycles every 3.5s · or click arrows</p>
      </section>

      {/* Languages */}
      <section className="fade-up fade-up-5 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2"><span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>languages</h2>
        <div className="space-y-3">
          {languages.map(({ lang, level, pct, flag }) => (
            <LangBar key={lang} lang={lang} level={level} pct={pct} flag={flag} />
          ))}
        </div>
      </section>

      {/* Skills with tab toggle */}
      <section className="fade-up fade-up-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2"><span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>skills</h2>
          <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'rgba(var(--border-rgb),0.5)' }}>
            {(['tech', 'design'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSkillTab(tab)}
                className="text-[10px] px-3 py-1 rounded-md capitalize transition-all duration-150"
                style={skillTab === tab ? {
                  background: 'rgba(240,240,219,0.12)', color: 'var(--accent)',
                } : {
                  color: 'var(--muted)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(skillTab === 'tech' ? techTiers : designTiers).map(([tier, skills], tierIdx) => (
            <div key={tier} className="space-y-2">
              <motion.p
                className="text-[10px] uppercase tracking-widest text-[var(--muted)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: tierIdx * 0.1 }}
              >
                {tier}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-1.5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: tierIdx * 0.08 } }, hidden: {} }}
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.75, y: 14 },
                      visible: { opacity: 1, scale: 1,    y: 0  },
                    }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--text-sec)]"
                    style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="fade-up fade-up-7 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2"><span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>links</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { label: 'GitHub', url: 'https://github.com/amrlhakimii', icon: '🐙', sub: '@amrlhakimii' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/amrlhakimii/', icon: '💼', sub: 'amrlhakimii' },
            { label: 'Instagram', url: 'https://instagram.com/kimiflickr', icon: '📸', sub: '@kimiflickr' },
          ].map(({ label, url, icon, sub }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-4 transition-all duration-150 hover:-translate-y-0.5 group"
              style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
            >
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-sm text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">{label}</p>
                <p className="text-[10px] text-[var(--muted)]">{sub}</p>
              </div>
              <span className="ml-auto text-[var(--border-hover)] group-hover:text-[var(--text-sec)] transition-colors duration-150 text-sm">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
