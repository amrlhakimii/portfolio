import { useState } from 'react'
import PageHeader from '../components/PageHeader'

interface Milestone {
  title: string
  organization: string
  period: string
  description: string
  type: 'education' | 'internship' | 'freelance' | 'milestone' | 'work'
  logoInitials?: string
  logo?: string
  tags?: string[]
  current?: boolean
}

const timeline: Milestone[] = [
  {
    title: 'Cybersecurity Technologist - Advanced',
    organization: 'ExxonMobil, Kuala Lumpur',
    period: 'Starts 14 Dec 2026',
    description: 'Joining the IT Enterprise Security team at ExxonMobil\'s global business and technology center in Kuala Lumpur, which supports the company\'s Upstream, Product Solutions and Low Carbon Solutions businesses worldwide. The role is to identify, detect, protect against, and respond to cyber threats across on-premises and cloud systems, keeping data confidential, intact, and available. Day to day that means monitoring, supporting, and investigating security events and incidents; supporting cyber and network security tools; vulnerability management and testing; threat intelligence; managing external network connections and firewall policy; and tuning monitoring and alerting, coding the changes into production. It also means working with other teams and vendors to apply security best practice, and raising security awareness. A deliberate move from building software into defending it — preparing with a hands-on SOC detection lab (Sigma and Splunk rules, Python log analysis, MITRE ATT&CK mapping).',
    type: 'work',
    logoInitials: 'XOM',
    logo: '/logos/exxonmobil.svg',
    tags: ['IT Enterprise Security', 'threat detection', 'incident response', 'security monitoring', 'vulnerability management', 'threat intelligence', 'firewall policy', 'SIEM', 'MITRE ATT&CK', 'Python', 'cloud security'],
  },
  {
    title: 'Software Engineer',
    organization: 'Workforce AI, The Access Group',
    period: 'Jul 2026 — Oct 2026',
    description: 'Absorbed into a permanent Software Engineer position with the Workforce AI team at The Access Group, following the completion of an internship as Associate Project Coordinator / Associate Software Engineer Intern. Working with the Romania team on PolicyIQ, a multi-tenant cyber governance, risk & compliance platform — full-stack across React interfaces, ASP.NET Core APIs, EF Core/SQL Server data modelling, authentication and authorization, Azure infrastructure, automated testing, and CI/CD. Also built a OneTrust connector for Access EVO and an MCP server that expose the full OneTrust API to users.',
    type: 'work',
    logoInitials: 'TAG',
    logo: '/logos/access.png',
    tags: ['Workforce AI', 'PolicyIQ', 'React 19', 'TypeScript', 'C#', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Azure', 'Docker', 'Access EVO', 'OneTrust connector', 'MCP', 'multi-tenant authorization', 'Romania team', 'Product Engineering'],
  },
  {
    title: 'Associate Project Coordinator / Associate Software Engineer Intern',
    organization: 'The Access Group - APAC',
    period: 'Mar 2026 — 26 Jul 2026',
    description: 'Interned as an Associate Project Coordinator at The Access Group APAC. Scheduled and managed meetings between consultants and clients, handled communications with clients from across the globe, and supported the UK team in coordinating between clients and consultants. Used Salesforce and Access Focalpoint daily to manage workflows and track project activity. After being assessed, was handed a cross-team project to support Professional Services — collaborating with the Workforce AI Team from Product Engineering to build the Flightpath Welcome Email Tool: an internal automation app that joins Sales Handover and SOW Booking data from FocalPoint, groups bookings by Project Code, and auto-generates structured welcome email drafts. Built in EVO Builder; Phase 2 replaces Excel exports with a live FocalPoint API and Outlook auto-send. At an internal Connector-thon hackathon, built a Flightpath API webhook connector using n8n and EVO workflow automation. Also built the PO Ticketing System, letting anyone in the office raise requests for the PO Team to track and action, and the SHR Timesheet Log, rolled out globally for the SHR team across APAC, EMEA, and the Americas — delivered end-to-end in 3 weeks. Throughout, coordinated with stakeholders across regions and joined meetings with Access APAC\'s top leadership. Also picked up Azure CI/CD end-to-end — setting up pipelines, resource groups, container apps, Rancher, Docker, and blob storage. Internship extended to 26 Jul 2026, after which absorbed into a permanent Software Engineer role with Workforce AI.',
    type: 'internship',
    logoInitials: 'TAG',
    logo: '/logos/access.png',
    tags: ['project coordination', 'client comms', 'Salesforce', 'Access Focalpoint', 'UK team support', 'AI automation', 'Flightpath', 'n8n', 'Connector-thon', 'PO Ticketing System', 'SHR Timesheet Log', 'stakeholder management', 'Azure CI/CD', 'Docker', 'Rancher', 'Professional Services', 'Workforce AI Team'],
  },
  {
    title: 'Freelance Full-Stack Developer',
    organization: 'Independent',
    period: '2025 — present',
    description: 'Taking on paid client projects end-to-end — from requirements gathering and PRD to UI design, full-stack build, and deployment. Projects include PapVision, a cytopathology learning platform commissioned by a UiTM lecturer for medical students, and ongoing web app work for clients who need a technical partner, not just a contractor.',
    type: 'freelance',
    logoInitials: '⚡',
    tags: ['React', 'TypeScript', 'Firebase', 'Supabase', 'full-stack', 'client work', 'PRD'],
    current: true,
  },
  {
    title: 'Bachelor of Computer Science (Hons.) — CS230',
    organization: 'UiTM Kampus Tapah, Perak',
    period: '2024 — 2026',
    description: 'Graduated with a CGPA of 3.76. Final-year project: a React Native iOS app + web platform for UiTM students to record attendance via QR code scanning, integrated with MySQL for secure login, attendance records, timetable, and student dashboard.',
    type: 'education',
    logoInitials: 'UiTM',
    logo: '/logos/uitm.png',
    tags: ['React Native', 'MySQL', 'CGPA 3.76'],
  },
  {
    title: 'Video Editor Intern',
    organization: 'Rev Media Group & Media Prima',
    period: 'Sep 2023 — Feb 2024',
    description: 'Worked with OhBulan! as video editor, videographer, and photographer. Directed and edited OBTV — a 5-minute TV show on TV9 aired Thursday–Saturday. Produced Lit Tak?, a show featuring influencers, artists, and KOLs. Worked as videographer, editor and gaffer for Show Dalam Bilik podcast on OhBulan! YouTube. Assisted on a TV3 Raya Game Show. Official photographer for VOCKET at Hausboom Music 2023, TapauFest 2023, and Aina Abdul\'s solo concert press conference at Starhill.',
    type: 'internship',
    logoInitials: 'Rev',
    logo: '/logos/mediaprima.svg',
    tags: ['video editing', 'TV9', 'OhBulan!', 'photography'],
  },
  {
    title: 'Graphic Designer',
    organization: 'FexieWear',
    period: 'Jun 2023 — Oct 2023',
    description: 'Worked as a graphic designer for FexieWear during a semester break, producing designs for the brand\'s apparel and marketing materials.',
    type: 'work',
    logoInitials: 'FW',
    logo: '/logos/fexiewear.jpg',
    tags: ['apparel design', 'branding'],
  },
  {
    title: 'Diploma in Computer Science (CS110) — First Class',
    organization: 'UiTM Kampus Sungai Petani',
    period: '2021 — 2024',
    description: 'Graduated February 2024 with First Class Honours, CGPA 3.54. Coursework covered web development, mobile app development, data structures, software engineering, database management, compilers, data visualisation, and multimedia.',
    type: 'education',
    logoInitials: 'UiTM',
    logo: '/logos/uitm.png',
    tags: ['First Class', 'CGPA 3.54', 'web dev'],
  },
  {
    title: 'Designer',
    organization: 'Youths.My',
    period: 'Sep 2020 — Jan 2025',
    description: 'Volunteered as a designer for the @youths.my social media accounts, collaborating remotely and contributing to various volunteering initiatives.',
    type: 'freelance',
    logoInitials: 'YM',
    logo: '/logos/youthsmy.jpg',
    tags: ['volunteer', 'social media', 'graphic design'],
  },
  {
    title: 'Freelance Designer',
    organization: 'Blugrafix',
    period: '2019 — present',
    description: 'Running my own company specialising in jersey sublimation printing and graphic design. Handling everything from client brief to final print-ready artwork.',
    type: 'freelance',
    logoInitials: '🎨',
    logo: '/logos/blugrafix.png',
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
    logo: '/logos/smkjitra.png',
    tags: ['leadership', 'photography'],
  },
  {
    title: 'Sijil Pelajaran Malaysia (SPM) — 6As',
    organization: 'Sekolah Menengah Kebangsaan Jitra',
    period: '2016 — 2021',
    description: 'Achieved 8As in PT3 and 6As in SPM. Active in extracurricular activities throughout secondary school.',
    type: 'education',
    logoInitials: 'SMK',
    logo: '/logos/smkjitra.png',
    tags: ['6As', 'SPM', '8As PT3'],
  },
]

const FILTERS = ['all', 'education', 'internship', 'freelance', 'work', 'milestone'] as const

export default function Career() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = filter === 'all' ? timeline : timeline.filter(t => t.type === filter)

  const stats = [
    { value: timeline.filter(t => t.type === 'internship').length, label: 'internships' },
    { value: timeline.filter(t => t.type === 'freelance').length,  label: 'freelance roles' },
    { value: timeline.filter(t => t.type === 'work').length,       label: 'work roles' },
    { value: new Date().getFullYear() - 2018,                      label: 'yrs experience' },
  ]

  return (
    <div className="space-y-10">
      <PageHeader
        title="Career"
        subtitle="Education, work, and milestones, newest first"
        meta={stats.map(({ value, label }) => `${value} ${label}`).join(' · ')}
        action={
          <a
            href="/AmirulHakimiCV.pdf"
            download="AmirulHakimiCV.pdf"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150"
          >
            Download CV
          </a>
        }
      />

      <div className="fade-up fade-up-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter by type">
        {FILTERS.map((f) => {
          const count = f === 'all' ? timeline.length : timeline.filter(t => t.type === f).length
          const active = filter === f
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-2 rounded-lg border capitalize transition-colors duration-150"
              style={active ? {
                background: 'rgba(var(--border-rgb),0.6)',
                borderColor: 'var(--border-hover)',
                color: 'var(--text-pri)',
              } : {
                background: 'transparent',
                borderColor: 'var(--border)',
                color: 'var(--text-sec)',
              }}
            >
              {f} <span className="text-[var(--muted)] tabular-nums">{count}</span>
            </button>
          )
        })}
      </div>

      <ol className="fade-up fade-up-4 relative space-y-4 pl-6 sm:pl-8">
        <span
          aria-hidden="true"
          className="absolute left-[7px] sm:left-[9px] top-3 bottom-3 w-px"
          style={{ background: 'var(--border)' }}
        />
        {visible.map((item) => {
          const id = `${item.title}|${item.organization}|${item.period}`
          const isOpen = expanded === id
          return (
            <li key={id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-6 sm:-left-8 top-6 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 flex items-center justify-center"
                style={{
                  background: 'var(--bg)',
                  borderColor: item.current ? 'var(--sec)' : 'var(--border-hover)',
                }}
              >
                {item.current && <span className="sec-dot" />}
              </span>

              <div
                className="rounded-2xl border transition-colors duration-150 hover:border-[var(--border-hover)]"
                style={{
                  borderColor: isOpen ? 'var(--border-hover)' : 'var(--border)',
                  background: isOpen ? 'rgba(var(--border-rgb),0.25)' : 'rgba(var(--border-rgb),0.12)',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : id)}
                  className="w-full text-left p-4 sm:p-5 cursor-pointer group"
                >
                  <span className="flex items-start gap-3 sm:gap-4">
                    <span
                      className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-xs font-medium shrink-0 overflow-hidden text-[var(--text-sec)]"
                      style={{ background: item.logo ? '#ffffff' : 'rgba(var(--border-rgb),0.5)' }}
                    >
                      {item.logo ? (
                        <img src={item.logo} alt="" className="w-full h-full object-contain p-1" loading="lazy" />
                      ) : (
                        item.logoInitials ?? item.organization[0]
                      )}
                    </span>
                    <span className="min-w-0 flex-1 space-y-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className="tabular-nums text-[var(--muted)]" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>
                          {item.period}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full border capitalize text-[var(--text-sec)]"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          {item.type}
                        </span>
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 text-[var(--sec)]">
                            <span className="sec-dot" aria-hidden="true" />
                            Active
                          </span>
                        )}
                      </span>
                      <span className="block font-serif text-lg sm:text-xl leading-snug text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">
                        {item.title}
                      </span>
                      <span className="block text-sm text-[var(--text-sec)]">{item.organization}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1 text-[var(--muted)] transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </span>

                  <span className={`mt-3 text-sm text-[var(--text-sec)] leading-relaxed ${isOpen ? 'block' : 'line-clamp-2'}`}>
                    {item.description}
                  </span>
                </button>

                {isOpen && item.tags && item.tags.length > 0 && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md border text-[var(--text-sec)]"
                        style={{ borderColor: 'var(--border)', background: 'rgba(var(--border-rgb),0.3)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <p className="fade-up fade-up-6 text-xs text-[var(--muted)]">Tap an entry to read more · {timeline.length} total</p>
    </div>
  )
}
