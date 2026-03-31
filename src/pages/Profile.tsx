import { useState, useEffect, useRef } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const techSkills = [
  { name: 'React.js',            level: 90 },
  { name: 'React Native',        level: 82 },
  { name: 'TypeScript',          level: 90 },
  { name: 'JavaScript',          level: 88 },
  { name: 'TailwindCSS',         level: 72 },
  { name: 'Node.js',             level: 82 },
  { name: 'Python',              level: 65 },
  { name: 'MySQL',               level: 70 },
  { name: 'Firebase',            level: 68 },
  { name: 'Git',                 level: 85 },
  { name: 'REST APIs',           level: 88 },
  { name: 'PHP',                 level: 60 },
  { name: 'Java',                level: 88 },
  { name: 'C++',                 level: 75 },
  { name: 'Expo',                level: 95 },
  { name: 'Artificial Intelligence', level: 72 },
]

const designSkills = [
  { name: 'Adobe Photoshop',    level: 88 },
  { name: 'Adobe Lightroom',    level: 92 },
  { name: 'Adobe Illustrator',  level: 85 },
  { name: 'Adobe Premiere Pro', level: 80 },
  { name: 'Adobe After Effects',level: 70 },
  { name: 'Figma',              level: 82 },
  { name: 'Canva',              level: 90 },
]

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

// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(level), 100)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [level])

  const color = level >= 85 ? '#f0f0db' : level >= 70 ? '#e1d9bc' : '#acbac4'

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#e1d9bc]">{name}</span>
        <span className="text-[10px] tabular-nums" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(58,64,96,0.6)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, #acbac4, ${color})`,
          }}
        />
      </div>
    </div>
  )
}

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
      className="rounded-xl border border-[#3a4060] p-5 flex items-center gap-4"
      style={{ background: 'rgba(48,54,79,0.5)' }}
    >
      <button onClick={prev} className="text-[#4a5278] hover:text-[#acbac4] transition-colors duration-150 shrink-0 text-lg">‹</button>
      <div className="flex-1 text-center min-h-[2rem] flex items-center justify-center">
        <p
          className="text-sm text-[#e1d9bc] transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {funFacts[idx]}
        </p>
      </div>
      <button onClick={next} className="text-[#4a5278] hover:text-[#acbac4] transition-colors duration-150 shrink-0 text-lg">›</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {funFacts.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full transition-colors duration-200"
            style={{ background: i === idx ? '#f0f0db' : '#3a4060' }} />
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
        <span className="text-sm text-[#e1d9bc] flex items-center gap-2">{flag} {lang}</span>
        <span className="text-xs text-[#acbac4] border border-[#3a4060] px-2 py-0.5 rounded-full">{level}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(58,64,96,0.5)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: 'linear-gradient(90deg, #606880, #e1d9bc)' }}
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
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Profile</h1>
        <p className="text-[#acbac4] text-sm">the full picture — who, what, where, and why</p>
      </header>

      {/* Identity card */}
      <section className="fade-up fade-up-2">
        <div
          className="rounded-2xl border border-[#3a4060] overflow-hidden"
          style={{ background: 'rgba(48,54,79,0.5)' }}
        >
          {/* Card header stripe */}
          <div
            className="px-5 py-3 flex items-center justify-between border-b border-[#3a4060]"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#606880]">identity card</span>
            </div>
            <span className="text-[10px] text-[#606880]">🪪 kimi.dev</span>
          </div>

          <div className="p-5 space-y-3">
            {identity.map(({ label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#606880] w-20 shrink-0 pt-0.5">{label}</span>
                {href ? (
                  <a href={href} className="text-sm text-[#f0f0db] hover:underline">{value}</a>
                ) : (
                  <span className="text-sm text-[#e1d9bc]">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local time + status */}
      <section className="fade-up fade-up-3">
        <div
          className="rounded-xl border border-[#3a4060] px-5 py-4 flex items-center justify-between"
          style={{ background: 'rgba(48,54,79,0.4)' }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#606880] mb-1">local time — Jitra, Kedah (MYT)</p>
            <p className="text-2xl font-semibold text-[#f0f0db] tabular-nums" style={{ fontFamily: 'monospace' }}>{myTimeStr}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#acbac4]">{timeStatus}</p>
            <p className="text-[10px] text-[#4a5278] mt-1">UTC +8:00</p>
          </div>
        </div>
      </section>

      {/* Fun facts carousel */}
      <section className="fade-up fade-up-4 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[#acbac4]">fun facts</h2>
        <div className="relative">
          <FunFactCarousel />
        </div>
        <p className="text-[10px] text-[#4a5278]">auto-cycles every 3.5s · or click arrows</p>
      </section>

      {/* Languages */}
      <section className="fade-up fade-up-5 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[#acbac4]">languages</h2>
        <div className="space-y-3">
          {languages.map(({ lang, level, pct, flag }) => (
            <LangBar key={lang} lang={lang} level={level} pct={pct} flag={flag} />
          ))}
        </div>
      </section>

      {/* Skills with tab toggle */}
      <section className="fade-up fade-up-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest text-[#acbac4]">skills</h2>
          <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'rgba(58,64,96,0.5)' }}>
            {(['tech', 'design'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSkillTab(tab)}
                className="text-[10px] px-3 py-1 rounded-md capitalize transition-all duration-150"
                style={skillTab === tab ? {
                  background: 'rgba(240,240,219,0.12)', color: '#f0f0db',
                } : {
                  color: '#606880',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {(skillTab === 'tech' ? techSkills : designSkills).map(({ name, level }) => (
            <SkillBar key={name} name={name} level={level} />
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="fade-up fade-up-7 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[#acbac4]">links</h2>
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
              className="flex items-center gap-3 rounded-xl border border-[#3a4060] hover:border-[#4a5278] p-4 transition-all duration-150 hover:-translate-y-0.5 group"
              style={{ background: 'rgba(48,54,79,0.4)' }}
            >
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-sm text-[#e1d9bc] group-hover:text-[#f0f0db] transition-colors duration-150">{label}</p>
                <p className="text-[10px] text-[#606880]">{sub}</p>
              </div>
              <span className="ml-auto text-[#4a5278] group-hover:text-[#acbac4] transition-colors duration-150 text-sm">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
