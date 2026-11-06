import { useState, useEffect, useRef } from 'react'
import SectionLabel from '../components/SectionLabel'
import PageHeader from '../components/PageHeader'

// ── Data ──────────────────────────────────────────────────────────────────────

const techTiers: Record<string, string[]> = {
  expert:     ['React.js', 'TypeScript', 'C#', 'ASP.NET Core', 'Expo', 'React Native', 'JavaScript', 'Java', 'REST APIs'],
  proficient: ['.NET', 'EF Core', 'SQL Server', 'Node.js', 'Git', 'TailwindCSS', 'C++', 'MySQL', 'Firebase', 'Docker', 'OIDC / JWT Auth', 'GSAP', 'Framer Motion', 'Microsoft Azure', 'Azure DevOps'],
  familiar:   ['Python', 'PHP', 'AI / ML', 'AWS', 'Anime.js', 'Databricks', 'Supabase', 'Detection rules (Sigma / SPL)', 'MITRE ATT&CK', 'Log analysis', 'Network basics (DNS / HTTP / tcpdump)', 'Linux command line'],
  'learning now': ['Splunk / SIEM', 'EDR tooling', 'Sysmon', 'Wireshark', 'PowerShell', 'Incident response', 'Vulnerability management', 'Threat intelligence'],
}

// Skill name -> icon in /public/skills (skills without a brand mark stay text-only)
const skillIcons: Record<string, string> = {
  'React.js': 'react', 'React Native': 'react', 'TypeScript': 'typescript', 'C#': 'csharp', 'ASP.NET Core': 'dotnetcore',
  'Expo': 'expo', 'JavaScript': 'javascript', 'Java': 'java', '.NET': 'dotnetcore', 'EF Core': 'dotnetcore',
  'SQL Server': 'sqlserver', 'Node.js': 'nodejs', 'Git': 'git', 'TailwindCSS': 'tailwindcss', 'C++': 'cplusplus',
  'MySQL': 'mysql', 'Firebase': 'firebase', 'Docker': 'docker', 'GSAP': 'gsap', 'Framer Motion': 'framermotion',
  'Microsoft Azure': 'azure', 'Azure DevOps': 'azuredevops', 'Python': 'python', 'PHP': 'php', 'AWS': 'aws',
  'Databricks': 'databricks', 'Supabase': 'supabase', 'Linux command line': 'linux', 'Wireshark': 'wireshark',
  'PowerShell': 'powershell', 'Splunk / SIEM': 'splunk',
  'Adobe Lightroom': 'lightroom', 'Adobe Photoshop': 'photoshop', 'Canva': 'canva', 'Adobe Illustrator': 'illustrator',
  'Affinity Designer': 'affinity', 'Figma': 'figma', 'Adobe Premiere Pro': 'premiere', 'DaVinci Resolve': 'davinci',
  'Adobe After Effects': 'aftereffects',
}

const designTiers: Record<string, string[]> = {
  expert:     ['Adobe Lightroom', 'Adobe Photoshop', 'Canva'],
  proficient: ['Adobe Illustrator', 'Affinity Designer', 'Figma', 'Adobe Premiere Pro', 'DaVinci Resolve'],
  familiar:   ['Adobe After Effects'],
}

const languages = [
  { lang: 'Malay',            level: 'Native',       pct: 100 },
  { lang: 'English',          level: 'Native',       pct: 98,  flag: '' },
  { lang: 'Bahasa Indonesia', level: 'Fluent',        pct: 80,  flag: '' },
  { lang: 'Mandarin',         level: 'Intermediate', pct: 45,  flag: '' },
]

const funFacts = [
  'Shot my first paid wedding at 16',
  'Runs a sublimation printing business (Blugrafix)',
  'Checks Arsenal lineup 30 min before every match',
  'Could explain DRS rules at 3am',
  'Directed a 5-min TV show on TV9',
  'Full-stack: React front, .NET back, Azure in between',
  'Was the gaffer & video editor for OhBulan! YouTube',
  'Speaks 4 languages',
  'First Class Honours in Diploma CS (CGPA 3.54)',
  'Does best work after midnight',
  'Handed a cross-team AI project as an intern at Access Group',
  'Moving from building software to defending it — cybersecurity at ExxonMobil',
  'Building a home SOC lab: Sigma rules, Splunk searches, Python log analysis',
  'Shipped PWA + Google Auth + push notifications in one Hootang update',
  'Uses Claude Code daily to ship faster',
]

const identity = [
  { label: 'name',      value: 'Amirul Hakimi Bin Abdullah Sani' },
  { label: 'alias',     value: 'kimi · amrlhakimii' },
  { label: 'based',     value: 'Jitra, Kedah, Malaysia' },
  { label: 'role',      value: 'CS Graduate · Software Engineer turned Cybersecurity Technologist - Advanced · Designer · Photographer · Videographer & Editor' },
  { label: 'currently', value: 'Joining ExxonMobil (Kuala Lumpur) as Cybersecurity Technologist - Advanced · Dec 2026' },
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

  return (
    <div
      className="relative rounded-xl border border-[var(--border)] p-5 flex items-center gap-4"
      style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
    >
      <button onClick={prev} aria-label="Previous fact" className="w-9 h-9 text-[var(--muted)] hover:text-[var(--text-pri)] transition-colors duration-150 shrink-0 text-lg">‹</button>
      <div className="flex-1 text-center min-h-[2rem] flex items-center justify-center">
        <p
          className="text-sm text-[var(--text-pri)] transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {funFacts[idx]}
        </p>
      </div>
      <button onClick={next} aria-label="Next fact" className="w-9 h-9 text-[var(--muted)] hover:text-[var(--text-pri)] transition-colors duration-150 shrink-0 text-lg">›</button>
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
function LangBar({ lang, level, pct }: { lang: string; level: string; pct: number }) {
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
        <span className="text-sm text-[var(--text-pri)]">{lang}</span>
        <span className="text-xs text-[var(--text-sec)] border border-[var(--border)] px-2 py-0.5 rounded-full">{level}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(var(--border-rgb),0.5)' }}>
        <div
          className="h-full w-full rounded-full origin-left"
          style={{ transform: `scaleX(${width / 100})`, background: 'var(--text-sec)', transition: 'transform 700ms cubic-bezier(0.2, 0, 0, 1)' }}
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
    const t = setInterval(() => setMyTime(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const myTimeStr = myTime.toLocaleTimeString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
  const myHour = parseInt(myTime.toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur', hour: '2-digit', hour12: false }))
  const timeStatus = myHour >= 22 || myHour < 6
    ? 'Probably asleep'
    : myHour >= 6 && myHour < 12
    ? 'Morning grind'
    : myHour >= 12 && myHour < 18
    ? 'Working'
    : 'Late afternoon'

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" subtitle="The full picture: who, what, where, and why" />

      <div className="grid md:grid-cols-[1fr_18rem] gap-4 items-start">
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
              <span className="sec-dot" aria-hidden="true" />
              <span className="text-xs text-[var(--muted)]">Identity card</span>
            </div>
            <span className="text-xs text-[var(--muted)]">kimi.dev</span>
          </div>

          <div className="p-5 space-y-3">
            {identity.map(({ label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="text-xs text-[var(--muted)] w-20 shrink-0 pt-0.5">{label}</span>
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
          className="rounded-xl border border-[var(--border)] p-5 flex flex-col items-start gap-4"
          style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
        >
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Local time, Jitra, Kedah (MYT)</p>
            <p className="text-2xl font-medium text-[var(--text-pri)] tabular-nums" style={{ fontFamily: 'monospace' }}>{myTimeStr}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-sec)]">{timeStatus}</p>
            <p className="text-xs text-[var(--muted)] mt-1">UTC +8:00</p>
          </div>
        </div>
      </section>

      </div>

      {/* Fun facts carousel */}
      <section className="fade-up fade-up-4 space-y-3">
        <SectionLabel>Fun facts</SectionLabel>
        <div className="relative">
          <FunFactCarousel />
        </div>
      </section>

      {/* Languages */}
      <section className="fade-up fade-up-5 space-y-3">
        <SectionLabel>Languages</SectionLabel>
        <div className="space-y-3">
          {languages.map(({ lang, level, pct }) => (
            <LangBar key={lang} lang={lang} level={level} pct={pct} />
          ))}
        </div>
      </section>

      {/* Skills with tab toggle */}
      <section className="fade-up fade-up-6 space-y-4">
        <div className="flex items-center justify-between">
          <SectionLabel>Skills</SectionLabel>
          <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'rgba(var(--border-rgb),0.5)' }}>
            {(['tech', 'design'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSkillTab(tab)}
                className="text-xs px-3 py-1 rounded-md capitalize transition-colors duration-150"
                style={skillTab === tab ? {
                  background: 'var(--bg)', color: 'var(--text-pri)',
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
          {Object.entries(skillTab === 'tech' ? techTiers : designTiers).map(([tier, skills]) => (
            <div key={`${skillTab}-${tier}`} className="space-y-2">
              <p className="text-xs text-[var(--muted)] capitalize">{tier}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-md border border-[var(--border)] text-[var(--text-sec)] inline-flex items-center gap-1.5"
                    style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
                  >
                    {skillIcons[skill] && (
                      <img
                        src={`/skills/${skillIcons[skill]}.svg`}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-4 h-4 rounded-[3px] bg-white p-[1.5px] object-contain shrink-0"
                      />
                    )}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="fade-up fade-up-7 space-y-3">
        <SectionLabel>Links</SectionLabel>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { label: 'GitHub', url: 'https://github.com/amrlhakimii', sub: '@amrlhakimii' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/amrlhakimii/', sub: 'amrlhakimii' },
            { label: 'Instagram', url: 'https://instagram.com/kimiflickr', sub: '@kimiflickr' },
          ].map(({ label, url, sub }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-4 transition-colors duration-150 group"
              style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
            >
              <div>
                <p className="text-sm text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">{label}</p>
                <p className="text-xs text-[var(--muted)]">{sub}</p>
              </div>
              <span className="ml-auto text-[var(--muted)] group-hover:text-[var(--text-pri)] transition-colors duration-150 text-sm">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
