import { useState } from 'react'

interface Milestone {
  title: string
  organization: string
  period: string
  description: string
  type: 'education' | 'internship' | 'freelance' | 'milestone' | 'work'
  logoInitials?: string
  tags?: string[]
  current?: boolean
}

const timeline: Milestone[] = [
  {
    title: 'Associate Project Coordinator Intern',
    organization: 'The Access Group - APAC',
    period: 'Mar 2026 — present',
    description: 'Interning as an Associate Project Coordinator at The Access Group APAC, supporting project delivery and coordination across the Asia-Pacific region.',
    type: 'internship',
    logoInitials: 'TAG',
    tags: ['project management', 'APAC', 'coordination'],
    current: true,
  },
  {
    title: 'Bachelor of Computer Science (Hons.) — CS230',
    organization: 'UiTM Kampus Tapah, Perak',
    period: '2024 — present',
    description: 'Currently in Semester 7 with a CGPA of 3.76. Final-year project: a React Native iOS app + web platform for UiTM students to record attendance via QR code scanning, integrated with MySQL for secure login, attendance records, timetable, and student dashboard.',
    type: 'education',
    logoInitials: 'UiTM',
    tags: ['React Native', 'MySQL', 'CGPA 3.76'],
    current: true,
  },
  {
    title: 'Video Editor Intern',
    organization: 'Rev Media Group & Media Prima',
    period: 'Sep 2023 — Feb 2024',
    description: 'Worked with OhBulan! as video editor, videographer, and photographer. Directed and edited OBTV — a 5-minute TV show on TV9 aired Thursday–Saturday. Produced Lit Tak?, a show featuring influencers, artists, and KOLs. Worked as videographer, editor and gaffer for Show Dalam Bilik podcast on OhBulan! YouTube. Assisted on a TV3 Raya Game Show. Official photographer for VOCKET at Hausboom Music 2023, TapauFest 2023, and Aina Abdul\'s solo concert press conference at Starhill.',
    type: 'internship',
    logoInitials: 'Rev',
    tags: ['video editing', 'TV9', 'OhBulan!', 'photography'],
  },
  {
    title: 'Graphic Designer',
    organization: 'FexieWear',
    period: 'Jun 2023 — Oct 2023',
    description: 'Worked as a graphic designer for FexieWear during a semester break, producing designs for the brand\'s apparel and marketing materials.',
    type: 'work',
    logoInitials: 'FW',
    tags: ['apparel design', 'branding'],
  },
  {
    title: 'Diploma in Computer Science (CS110) — First Class',
    organization: 'UiTM Kampus Sungai Petani',
    period: '2021 — 2024',
    description: 'Graduated February 2024 with First Class Honours, CGPA 3.54. Coursework covered web development, mobile app development, data structures, software engineering, database management, compilers, data visualisation, and multimedia.',
    type: 'education',
    logoInitials: 'UiTM',
    tags: ['First Class', 'CGPA 3.54', 'web dev'],
  },
  {
    title: 'Designer',
    organization: 'Youths.My',
    period: 'Sep 2020 — Jan 2025',
    description: 'Volunteered as a designer for the @youths.my social media accounts, collaborating remotely and contributing to various volunteering initiatives.',
    type: 'freelance',
    logoInitials: 'YM',
    tags: ['volunteer', 'social media', 'graphic design'],
  },
  {
    title: 'Freelance Designer',
    organization: 'Blugrafix',
    period: '2019 — present',
    description: 'Running my own company specialising in jersey sublimation printing and graphic design. Handling everything from client brief to final print-ready artwork.',
    type: 'freelance',
    logoInitials: '🎨',
    tags: ['sublimation', 'jersey design', 'founder'],
    current: true,
  },
  {
    title: 'Freelance Photographer & Videographer',
    organization: 'Independent',
    period: '2018 — present',
    description: 'Covering weddings, solemnisations, school events, corporate events, and product launches. Built a steady client base and refined a clean, photojournalistic shooting style.',
    type: 'freelance',
    logoInitials: '📷',
    tags: ['weddings', 'events', 'videography'],
    current: true,
  },
  {
    title: 'President of Photography Club',
    organization: 'SMK Jitra',
    period: 'Jan 2020 — Feb 2021',
    description: 'Led the school photography club — organised and photographed major school events, coordinated a team of photographers across multiple concurrent assignments.',
    type: 'milestone',
    logoInitials: '🏆',
    tags: ['leadership', 'photography'],
  },
  {
    title: 'Sijil Pelajaran Malaysia (SPM) — 6As',
    organization: 'Sekolah Menengah Kebangsaan Jitra',
    period: '2016 — 2021',
    description: 'Achieved 8As in PT3 and 6As in SPM. Active in extracurricular activities throughout secondary school.',
    type: 'education',
    logoInitials: 'SMK',
    tags: ['6As', 'SPM', '8As PT3'],
  },
]

const TYPE_CONFIG = {
  education:  { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.2)',  label: 'education',  dot: '#60a5fa' },
  internship: { color: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(117, 88, 80, 0.2)', label: 'internship', dot: '#c084fc' },
  freelance:  { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)',  label: 'freelance',  dot: '#4ade80' },
  work: { color: '#bb5428ff', bg: 'rgba(145, 77, 32, 0.1)', border: 'rgba(162, 109, 61, 0.2)', label: 'work', dot: '#c44c4cff' },
  milestone:  { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)',  label: 'milestone',  dot: '#fbbf24' },
}

const FILTERS = ['all', 'education', 'internship', 'freelance', 'work', 'milestone'] as const
export default function Career() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  const visible = filter === 'all' ? timeline : timeline.filter(t => t.type === filter)

  const stats = [
    { value: timeline.filter(t => t.type === 'internship').length, label: 'internships' },
    { value: timeline.filter(t => t.type === 'freelance').length,  label: 'freelance roles' },
    { value: timeline.filter(t => t.type === 'work').length,  label: 'work roles' },
    { value: new Date().getFullYear() - 2018, label: 'yrs experience' },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <header className="fade-up fade-up-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Career</h1>
            <p className="text-[#acbac4] text-sm">education, work, and milestones — newest first</p>
          </div>
          <a
            href="/AmirulHakimiCV.pdf"
            download="AmirulHakimiCV.pdf"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#4a5278] text-xs text-[#acbac4] hover:text-[#f0f0db] hover:border-[#f0f0db] transition-all duration-150 shrink-0 mt-1"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            download cv
          </a>
        </div>
      </header>

      {/* Stats */}
      <section className="fade-up fade-up-2 grid grid-cols-4 gap-2">
        {stats.map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[#3a4060] p-3 text-center" style={{ background: 'rgba(48,54,79,0.4)' }}>
            <p className="text-lg font-semibold text-[#f0f0db]">{value}</p>
            <p className="text-[9px] uppercase tracking-wider text-[#606880] mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Filter tabs */}
      <div className="fade-up fade-up-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const cfg = f !== 'all' ? TYPE_CONFIG[f] : null
          const count = f === 'all' ? timeline.length : timeline.filter(t => t.type === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[10px] px-3 py-1.5 rounded-full border capitalize transition-all duration-150 flex items-center gap-1.5"
              style={filter === f ? {
                background: cfg ? cfg.bg : 'rgba(240,240,219,0.1)',
                borderColor: cfg ? cfg.border : 'rgba(240,240,219,0.2)',
                color: cfg ? cfg.color : '#f0f0db',
              } : {
                background: 'rgba(48,54,79,0.3)',
                borderColor: '#3a4060',
                color: '#606880',
              }}
            >
              {cfg && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />}
              {f} <span className="opacity-50">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="fade-up fade-up-4 relative">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px hidden sm:block"
          style={{ background: 'linear-gradient(to bottom, transparent, #3a4060 10%, #3a4060 90%, transparent)' }}
        />

        <div className="space-y-3">
          {visible.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type]
            const isOpen = expanded === i

            return (
              <div key={i} className="sm:pl-10 relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-[13px] top-5 w-2.5 h-2.5 rounded-full border-2 hidden sm:block"
                  style={{
                    background: item.current ? cfg.dot : '#30364f',
                    borderColor: cfg.dot,
                    boxShadow: item.current ? `0 0 8px ${cfg.dot}` : 'none',
                  }}
                />

                <div
                  className="border rounded-xl transition-all duration-200 overflow-hidden cursor-pointer"
                  style={{
                    borderColor: isOpen ? cfg.border : '#3a4060',
                    background: isOpen ? cfg.bg : 'rgba(48,54,79,0.45)',
                  }}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  {/* Card header — always visible */}
                  <div className="p-4 flex gap-4">
                    {/* Logo */}
                    <div
                      className="w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                    >
                      {item.logoInitials ?? item.organization[0]}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm font-medium text-[#e1d9bc] leading-snug">{item.title}</h2>
                          {item.current && (
                            <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full"
                              style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                              <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                              active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full capitalize"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                          >
                            {item.type}
                          </span>
                          <span
                            className="text-[#4a5278] transition-transform duration-200 text-xs"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            ▾
                          </span>
                        </div>
                      </div>
                      <p className="text-xs" style={{ color: cfg.color }}>{item.organization} · {item.period}</p>
                    </div>
                  </div>

                  {/* Expandable body */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? '400px' : '0px' }}
                  >
                    <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: cfg.border }}>
                      <p className="text-sm text-[#acbac4] leading-relaxed pt-3">{item.description}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded border"
                              style={{ color: '#acbac4', borderColor: '#3a4060', background: 'rgba(58,64,96,0.5)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="fade-up fade-up-5 flex flex-wrap gap-4 pt-2">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
            <span className="text-[10px] text-[#606880] capitalize">{type}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-[#606880]">active / ongoing</span>
        </div>
      </div>

      <p className="fade-up fade-up-6 text-[10px] text-[#3a4060]">click any card to expand · {timeline.length} entries total</p>
    </div>
  )
}
