import { useState } from 'react'

interface Project {
  title: string
  description: string
  stack: string[]
  link?: string
  github?: string
  category: 'software' | 'ai' | 'design'
  status: 'shipped' | 'in progress' | 'wip'
  year: string
  highlight?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'MyCampus QR Attendance System',
    description: 'iOS React Native app + web platform for UiTM students to record attendance via QR code scanning. Features secure login, attendance records, course registration, custom timetable, and a student academic dashboard. Final Year Project.',
    stack: ['React Native', 'React.js', 'MySQL', 'Expo', 'Node.js', 'TailwindCSS'],
    github: 'https://github.com/amrlhakimii/myCampus',
    category: 'software',
    status: 'in progress',
    year: '2025',
    highlight: 'Final Year Project',
    featured: true,
  },
  {
    title: 'Dah Qada Kimi',
    description: 'An offline-first prayer tracking app for Malaysian Muslims to log and manage qada (missed) prayers. Covers all 14 states with JAKIM prayer zone codes.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Material-UI', 'Dexie.js', 'TanStack Query', 'Axios'],
    github: 'https://github.com/amrlhakimii/dah-qada-kimi',
    category: 'software',
    status: 'shipped',
    year: '2024',
    highlight: 'offline-first',
    featured: true,
  },
  {
    title: 'KiraKira — Car Loan Chatbot',
    description: 'A friendly chatbot helping young Malaysians and first-time car buyers estimate monthly loan payments. Collects car price, down payment, interest rate, and loan duration — presented in a casual, emoji-enhanced style to ease financial decision-making.',
    stack: ['Python', 'AI/NLP', 'Chatbot'],
    github: 'https://github.com/amrlhakimii/KiraKira',
    category: 'ai',
    status: 'shipped',
    year: '2024',
    highlight: 'AI / chatbot',
  },
  {
    title: 'Malaysia Socioeconomic Data Visualisation',
    description: "A detailed visualisation of Malaysia's socioeconomic classes paired with a data storytelling magazine. Designed to make complex economic data accessible and visually engaging.",
    stack: ['PowerBI', 'Adobe Illustrator', 'Data Storytelling'],
    link: 'https://udzvyi.staticfast.com',
    category: 'design',
    status: 'shipped',
    year: '2023',
    highlight: 'data viz',
  },
  {
    title: 'Portfolio Website',
    description: "The site you're looking at — personal portfolio with floating glass navbar, cursor glow, animated side decorations, gradient mesh, noise overlay, canvas cursor trail, and smooth page transitions.",
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/amrlhakimii',
    category: 'software',
    status: 'in progress',
    year: '2025',
    highlight: 'you\'re here',
    featured: true,
  },
]

const CATEGORY_CONFIG = {
  software: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.2)',  label: 'software' },
  ai:       { color: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)', label: 'ai' },
  design:   { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)',  label: 'design' },
}

const STATUS_CONFIG = {
  'shipped':     { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)',  dot: true  },
  'in progress': { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)',  dot: true  },
  'wip':         { color: '#f97316', bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.2)',  dot: false },
}

const FILTERS = ['all', 'software', 'ai', 'design'] as const

export default function Projects() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  const stats = [
    { value: projects.length,                                              label: 'total' },
    { value: projects.filter(p => p.status === 'shipped').length,         label: 'shipped' },
    { value: projects.filter(p => p.status === 'in progress').length,     label: 'in progress' },
    { value: projects.filter(p => p.featured).length,                     label: 'featured' },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <header className="fade-up fade-up-1">
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Projects</h1>
        <p className="text-[var(--text-sec)] text-sm">things i've built, shipped, or abandoned at 90%</p>
      </header>

      {/* Stats */}
      <section className="fade-up fade-up-2 grid grid-cols-4 gap-2">
        {stats.map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[var(--border)] p-3 text-center" style={{ background: 'rgba(var(--bg-rgb),0.4)' }}>
            <p className="text-lg font-semibold text-[var(--accent)]">{value}</p>
            <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Filter tabs */}
      <div className="fade-up fade-up-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const cfg = f !== 'all' ? CATEGORY_CONFIG[f] : null
          const count = f === 'all' ? projects.length : projects.filter(p => p.category === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[10px] px-3 py-1.5 rounded-full border capitalize transition-all duration-150 flex items-center gap-1.5"
              style={filter === f ? {
                background: cfg ? cfg.bg : 'rgba(240,240,219,0.1)',
                borderColor: cfg ? cfg.border : 'rgba(240,240,219,0.2)',
                color: cfg ? cfg.color : 'var(--accent)',
              } : {
                background: 'rgba(var(--bg-rgb),0.3)',
                borderColor: 'var(--border)',
                color: 'var(--muted)',
              }}
            >
              {cfg && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.color }} />}
              {f} <span className="opacity-50">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Project list */}
      <div className="fade-up fade-up-4 space-y-3">
        {visible.map((project) => {
          const cat = CATEGORY_CONFIG[project.category]
          const sta = STATUS_CONFIG[project.status]
          const isOpen = expanded === project.title

          return (
            <article
              key={project.title}
              className="border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                borderColor: isOpen ? cat.border : 'var(--border)',
                background: isOpen ? cat.bg : 'rgba(var(--bg-rgb),0.45)',
              }}
              onClick={() => setExpanded(isOpen ? null : project.title)}
            >
              {/* Card header */}
              <div className="p-4 flex gap-4">
                {/* Year badge */}
                <div
                  className="w-10 h-10 rounded-lg border flex items-center justify-center text-[10px] font-semibold shrink-0 tabular-nums"
                  style={{ background: cat.bg, borderColor: cat.border, color: cat.color }}
                >
                  {project.year}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-medium text-[var(--text-pri)] leading-snug">{project.title}</h2>
                      {project.featured && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full border"
                          style={{ background: 'rgba(240,240,219,0.08)', color: 'var(--accent)', borderColor: 'rgba(240,240,219,0.15)' }}
                        >
                          ★ featured
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Status badge */}
                      <span
                        className="text-[9px] px-2 py-0.5 rounded-full border flex items-center gap-1"
                        style={{ background: sta.bg, color: sta.color, borderColor: sta.border }}
                      >
                        {sta.dot && (
                          <span
                            className="w-1 h-1 rounded-full"
                            style={{ background: sta.color, animation: project.status === 'in progress' ? 'pulse 2s infinite' : 'none' }}
                          />
                        )}
                        {project.status}
                      </span>
                      {/* Category */}
                      <span
                        className="text-[9px] px-2 py-0.5 rounded-full capitalize border"
                        style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}
                      >
                        {project.category}
                      </span>
                      {/* Chevron */}
                      <span
                        className="text-[var(--border-hover)] transition-transform duration-200 text-xs"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        ▾
                      </span>
                    </div>
                  </div>

                  {project.highlight && (
                    <p className="text-[10px]" style={{ color: cat.color }}>{project.highlight}</p>
                  )}
                </div>
              </div>

              {/* Expandable body */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? '500px' : '0px' }}
              >
                <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: cat.border }}>
                  <p className="text-sm text-[var(--text-sec)] leading-relaxed pt-3">{project.description}</p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded border"
                        style={{ color: 'var(--text-sec)', borderColor: 'var(--border)', background: 'rgba(var(--border-rgb),0.5)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.github || project.link) && (
                    <div className="flex gap-3 pt-1">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
                          style={{ color: '#f0f0db', borderColor: 'rgba(240,240,219,0.2)', background: 'rgba(240,240,219,0.06)' }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          github
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
                          style={{ color: cat.color, borderColor: cat.border, background: cat.bg }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          live demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Legend */}
      <div className="fade-up fade-up-5 flex flex-wrap gap-4 pt-2">
        {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
            <span className="text-[10px] text-[var(--muted)] capitalize">{cat}</span>
          </div>
        ))}
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
            <span className="text-[10px] text-[var(--muted)]">{status}</span>
          </div>
        ))}
      </div>

      <p className="fade-up fade-up-6 text-[10px] text-[var(--border)]">click any card to expand · {projects.length} projects total</p>
    </div>
  )
}
