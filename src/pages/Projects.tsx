import { useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import PageHeader from '../components/PageHeader'

const CHIP_RANKS = ['K', 'Q', 'J', '10', '9', '8', '7']
const CHIP_SUIT = { software: '♠', ai: '♣', design: '♦' } as const

interface Project {
  title: string
  description: string
  stack: string[]
  link?: string
  image?: string
  github?: string
  category: 'software' | 'ai' | 'design'
  status: 'shipped' | 'in progress' | 'wip'
  year: string
  highlight?: string
  featured?: boolean
  updates?: string[]
}

const projects: Project[] = [
  {
    title: 'Dewasa 101',
    description: 'A personal finance tracking web app, hosted on AWS end-to-end to learn AWS infra hands-on. React app served from a fully private S3 bucket behind CloudFront (Origin Access Control only — no public bucket access), with an ACM certificate in us-east-1 for HTTPS on a custom domain. Every resource — S3, CloudFront, ACM, IAM — is defined in Terraform (plan/apply, no console clicking). GitHub Actions deploys on every push, authenticating via IAM OIDC federation so no AWS access key is ever stored as a secret. Diagnosed and fixed a real production auth failure caused by a GitHub OIDC `sub` claim format change breaking the IAM trust policy. Auth and financial data storage run on Firebase (Auth + Firestore).',
    stack: ['React', 'TypeScript', 'Firebase', 'Firestore', 'AWS S3', 'AWS CloudFront', 'AWS ACM', 'AWS IAM', 'AWS OIDC Federation', 'Terraform', 'GitHub Actions'],
    link: 'https://dewasa.amrlhakimi.my',
    image: '/projects/dewasa.png',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'personal finance tracker · AWS infra from scratch',
    featured: true,
    updates: [
      'Hosted on a private S3 bucket + CloudFront CDN, locked down via Origin Access Control',
      'ACM certificate in us-east-1 for custom-domain HTTPS (CloudFront-specific region requirement)',
      'All infra as Terraform (.tf) — reviewed via terraform plan before every apply',
      'GitHub Actions CI/CD authenticates via IAM OIDC federation — zero stored AWS credentials',
      'Debugged a production IAM trust failure caused by a GitHub OIDC sub claim format change',
    ],
  },
  {
    title: 'Hootang',
    description: 'Tracks shared expenses, subscriptions, and IOUs — so you never forget who owes who. Splits restaurant receipts with tax, handles shared plans like Spotify or Netflix, tracks borrowed money, and calculates fair amounts. A dice feature decides who pays during hangouts. One month in, it got a proper upgrade: installable as a PWA, Google Sign-In with Firestore cross-device sync, Cloudflare Worker push notifications before due dates, WhatsApp share, and GSAP cinematic animations throughout.',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Firebase', 'GSAP', 'PWA', 'Cloudflare Workers'],
    link: 'https://hootang.amrlhakimi.my',
    image: '/projects/hootang.png',
    github: 'https://github.com/amrlhakimii/hootang',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'expense & IOU tracker',
    featured: true,
    updates: [
      'PWA — installable, runs fullscreen, no browser bar',
      'Google Sign-In + Firestore sync across devices',
      'Push notifications via Cloudflare Worker on schedule',
      'WhatsApp share — one tap after splitting a receipt',
      'GSAP animations: dashboard entrance, balance countup, dice shake',
      'iPhone UX: Dynamic Island support, safe area insets, input zoom disabled',
    ],
  },
  {
    title: 'Japan, Slowly',
    description: 'An interactive family-trip itinerary for a slow-paced Japan trip with a baby, built as a no-framework PWA. A swipeable day-by-day plan, a map of every stop with photos, a today view, a packing and prep checklist, a practical guide (transport, eSIM, money, language) and a yen-to-ringgit expense tracker with budgets. It plans around the family: low walking pace, feeds and naps, and prayer times scheduled as jamak. Installable and usable offline through a service worker, with a print-to-PDF export.',
    stack: ['JavaScript', 'Leaflet', 'MapLibre GL', 'PWA', 'Service Worker', 'HTML', 'CSS', 'Netlify'],
    link: 'https://japan.amrlhakimi.my',
    github: 'https://github.com/amrlhakimii/japan-iti',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'family itinerary · offline PWA · map + expenses',
    updates: [
      'Day-by-day plan with swipeable day slider, a today view and photo-rich stop cards',
      'Interactive map with every stop, plus a yen-to-ringgit expense tracker with budgets by category',
      'Installable PWA with a service worker that updates itself, so it works offline while travelling',
      'Prayer breaks planned as jamak, and a low-walking-pace route built around a baby',
    ],
  },
  {
    title: 'myRoda',
    description: 'A vehicle maintenance, fuel, and expense tracker built for Malaysian car and motorcycle owners. Register vehicles, log every workshop visit and refuel, set maintenance/road tax/insurance reminders, and see spending on a live dashboard — all synced in real time via Firestore. Consumption analysis on the fuel tracker, expense charts, and multi-vehicle support.',
    stack: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS v4', 'React Router', 'React Hook Form', 'Zod', 'TanStack Query', 'Zustand', 'Recharts', 'Firebase', 'Netlify'],
    link: 'https://myroda.amrlhakimi.my',
    image: '/projects/myroda.png',
    github: 'https://github.com/amrlhakimii/myRoda',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'vehicle maintenance & fuel tracker',
    featured: true,
  },
  {
    title: 'PhishCheck',
    description: 'A phishing email checker that runs entirely in the browser. Paste an email\'s raw source and it explains each red flag in plain language: failed SPF/DKIM/DMARC, sender and reply-to mismatches, lookalike and punycode domains, link text that lies about its destination, risky attachments and pressure wording (English and Bahasa Malaysia). It scores the email, decodes obfuscated IP links, and shows the Received chain with per-hop delay. It never renders the email\'s HTML, never opens or fetches a link, and shows every link defanged, so it is safe to use on real phishing.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest', 'DNS-over-HTTPS', 'MIME parsing'],
    github: 'https://github.com/amrlhakimii/phishcheck',
    link: 'https://phish.amrlhakimi.my',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'security awareness · private by design',
    updates: [
      '12 checks with weighted scoring shown in the app; samples score 100 (phish), 72 (lookalike), and 0 (newsletter)',
      '187 tests, including hostile-HTML and zero-network-call tests, and a strict CSP',
      'Heuristic indicators, not a guarantee; all sample emails use invented domains',
    ],
  },
  {
    title: 'LogLens Academy',
    description: 'An interactive, self-paced cybersecurity study companion with a hands-on log analyzer built in. The academy has 18 beginner-to-advanced modules built around a generic cybersecurity technologist role (SIEM and endpoint telemetry, incident response, threat intelligence, threat hunting, detection engineering, cloud security and more), each with written sections, diagrams, a four-question quiz and a synthetic practice scenario, plus a searchable resource library and glossary, skill radar, readiness checklist and a 30/60/90 day plan. The embedded LogLens lab runs explainable detection rules on Sysmon and Linux auth logs, each mapped to MITRE ATT&CK, with a timeline, raw event search and a close/investigate/escalate triage flow. Everything runs in the browser: content is bundled, progress stays in localStorage, and log files never leave your device. A study aid, not a certification; the detection rules are heuristics validated on invented sample data only.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Web Workers', 'Vitest', 'MITRE ATT&CK', 'Sigma'],
    github: 'https://github.com/amrlhakimii/loglens',
    link: 'https://loglens.amrlhakimi.my',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'cybersecurity academy + log analyzer · runs fully in your browser',
    updates: [
      'Grew from a log analyzer into an academy: 18 modules, 90 sections, 72 quiz questions, 18 practice scenarios, 52 resources and 118 glossary terms',
      'Original analyzer kept as an embedded SOC lab, with 6 detection rules ported from my SOC lab and a true-positive and false-positive test for each',
      '192 tests, including one proving no network request is made during analysis, and a strict no-inline-script CSP',
    ],
  },
  {
    title: 'SecKit MCP Server',
    description: 'A read-only MCP server that gives AI assistants authoritative defensive-security lookups instead of guesses. It checks a password against known breaches without ever sending it (k-anonymity: only a 5-character hash prefix leaves the machine), looks up CVEs from NVD, explains and searches MITRE ATT&CK techniques from a bundled offline snapshot, parses log lines, and defangs or refangs indicators. Defensive and educational only: no scanning, no exploitation, no telemetry, no file writes. Outbound traffic is restricted to two allow-listed hosts.',
    stack: ['TypeScript', 'Node.js', 'MCP', 'MCP SDK', 'Zod', 'Vitest', 'MITRE ATT&CK', 'NVD API'],
    github: 'https://github.com/amrlhakimii/seckit-mcp',
    category: 'ai',
    status: 'shipped',
    year: '2026',
    highlight: 'security MCP · read-only · privacy-preserving',
    updates: [
      '9 tools, 2 resources, and a triage prompt; ATT&CK v20 (706 techniques) bundled for offline use',
      '94 tests, all offline, including proof that the breach check only ever requests a 5-character hash prefix',
      'Host allow-list, input limits, and a test that the server writes nothing to stdout except protocol frames',
    ],
  },
  {
    title: 'Design System MCP Server',
    description: 'An MCP (Model Context Protocol) server that gives AI assistants my personal design system as tools, so UI they build comes out consistent instead of default-looking. It generates a full 8-stop palette from one accent colour, returns exact component class strings and rules (dark and light themes), outputs a starter Tailwind stylesheet, and reviews JSX against the rules, flagging things like flat cards, focus rings, and missing press animations. Hootang is the reference implementation, and the reviewer passes on its real components.',
    stack: ['TypeScript', 'Node.js', 'MCP', 'MCP SDK', 'Zod', 'Vitest', 'Tailwind CSS'],
    github: 'https://github.com/amrlhakimii/design-system-mcp',
    category: 'ai',
    status: 'shipped',
    year: '2026',
    highlight: 'MCP server · design system tooling',
    updates: [
      '6 tools: palette generator, foundations, component rules, starter CSS, UI reviewer, and a component list',
      'End-to-end tests start the real server over stdio and call the tools like an MCP client',
      'The tests caught a false-positive bug in my own reviewer, found by running it on Hootang',
    ],
  },
  {
    title: 'SOC Detection Lab',
    description: 'A hands-on learning project for moving from software engineering into security operations. Detections for five common attacker techniques — encoded PowerShell, LSASS credential access, comsvcs.dll MiniDump, scheduled-task persistence, and registry Run-key persistence — each written three ways: as a Sigma rule, a Splunk SPL search, and a Python detector that parses Sysmon JSON events, decodes PowerShell payloads, scores severity, and prints findings mapped to MITRE ATT&CK. Covered by pytest tests that check both the alerts and the near-misses it must ignore (an allowlisted svchost reading LSASS, a harmless schtasks /query). So far validated on sample log data I wrote myself; the next step is a Windows VM with Sysmon and Atomic Red Team to test the rules against real telemetry.',
    stack: ['Python', 'pytest', 'Sigma', 'Splunk SPL', 'MITRE ATT&CK', 'Sysmon'],
    category: 'software',
    status: 'in progress',
    year: '2026',
    highlight: 'detection engineering · learning project',
    updates: [
      '5 detections across credential access, execution, and persistence, each with Sigma + SPL + Python versions',
      'Tests cover false-positive cases, not just the attacks',
      'Documented lab setup (Windows VM, Sysmon, Splunk/Wazuh, Atomic Red Team) and an incident report template',
      'Honest status: rules not yet validated on real attack telemetry — that is the next milestone',
    ],
  },
  {
    title: 'Flightpath Welcome Email Tool',
    description: 'Internal automation tool built at The Access Group to eliminate the manual copy-paste process for client welcome emails. The tool joins two FocalPoint data sources — Sales Handover and SOW Booking Enquiry — by Project Code, groups booking records under each project, and auto-generates a structured welcome email draft per client. Built using EVO Builder in collaboration with the Workforce AI Team from Product Engineering. Phase 1 uses FocalPoint Excel exports as the data source; Phase 2 will replace this with a live FocalPoint API and auto-send via Outlook.',
    stack: ['React', '.NET', 'Microsoft Azure', 'Azure DevOps', 'Azure Container Apps', 'Docker', 'Rancher', 'Azure Blob Storage', 'CI/CD Pipelines', 'EVO Builder', 'EVO Workflow Automation', 'n8n', 'Access FocalPoint', 'Excel Integration', 'Devin CLI', 'Process Automation'],
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'internal automation · Access Group',
    updates: [
      'Connector-thon: built a Flightpath API webhook connector using n8n + EVO workflow automation, moving Phase 2 closer to a live FocalPoint data feed',
      'Picked up Azure CI/CD end-to-end: pipelines, resource groups, container apps, Rancher, Docker, and blob storage',
      'Shipped to Professional Services',
    ],
  },
  {
    title: 'OneTrust Connector & MCP Server',
    description: 'A OneTrust connector for Access EVO, plus an MCP (Model Context Protocol) server, that gives users access to everything the OneTrust API offers — so OneTrust can be queried and driven from EVO workflows and AI assistants instead of calling endpoints by hand.',
    stack: ['Access EVO', 'EVO Builder', 'EVO Workflow Automation', 'OneTrust API', 'MCP', 'MCP SDK', 'REST APIs', 'OpenAPI', 'OAuth', 'Node.js', '.NET', 'Python', 'Docker', 'Microsoft Azure', 'Azure DevOps', 'CI/CD Pipelines', 'xUnit', 'Vitest', 'pytest'],
    category: 'ai',
    status: 'shipped',
    year: '2026',
    highlight: 'Access EVO connector · full OneTrust API coverage',
  },
  {
    title: 'PolicyIQ',
    description: 'A multi-tenant cyber governance, risk & compliance platform used to author, assess, review, approve, publish, and export enterprise governance documents, mapped to frameworks like ISO 27001, NIST CSF, SOC 2, UK GDPR, and DORA. Contributed full-stack across the platform: tenant isolation hardening, a centralized role/scope/capability/tenant/record-level authorization model, secure database-backed download workflows with cryptographically secure tokens, document review & approval workflows, and identity-lifecycle handling for externally provisioned users. Deployed via a multi-stage Docker build to Azure Container Apps through Azure DevOps pipelines running backend/frontend tests, linting, and type checks.',
    stack: ['React 19', 'TypeScript', 'C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Microsoft Azure', 'Azure Container Apps', 'Azure Blob Storage', 'Docker', 'Azure DevOps', 'CI/CD Pipelines', 'OIDC/JWT', 'xUnit', 'Vitest'],
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'multi-tenant GRC platform · Access Group',
    updates: [
      'Hardened tenant isolation: subscription ownership, scoped queries, foreign-key constraints, cross-tenant denial tests',
      'Built centralized resource authorization combining role/scope/capability/tenant/record-level access controls',
      'Shipped secure document download workflows with opaque tokens, hashed storage, atomic redemption',
      'Fixed embedded-app auth loops across OIDC, cookie sessions, JWT bearer, and iframe redirect flows',
    ],
  },
  {
    title: 'PO Ticketing System',
    description: 'Internal ticketing tool built for the Project Office (PO) Team at The Access Group APAC, letting anyone across the office raise a request and have it tracked through to completion — replacing ad-hoc email and chat requests with a structured queue for the PO Team to action.',
    stack: ['EVO Builder', 'EVO Workflow Automation', 'Process Automation'],
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'internal automation · Access Group',
  },
  {
    title: 'SHR Timesheet Log',
    description: 'Global timesheet logging tool built for the SHR team at The Access Group, rolled out for use across APAC, EMEA, and the Americas. Built end-to-end — from requirements to delivery — within a 3-week window, coordinating with stakeholders across regions along the way.',
    stack: ['EVO Builder', 'EVO Workflow Automation', 'Process Automation'],
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'global rollout · Access Group',
  },
  {
    title: 'NakKahwin',
    description: 'A wedding planning web app for Muslim couples in Malaysia. Built from the reality of how complex planning a wedding can be — nikah forms, pre-marriage courses, hantaran, vendors, guests, budget — all scattered everywhere. NakKahwin brings everything into one place, with an information hub covering mas kahwin rates by state, wedding customs, and Malaysian Islamic procedures.',
    stack: ['React 19', 'TypeScript', 'Vite 8', 'TailwindCSS', 'React Router', 'LocalStorage'],
    link: 'https://nakkahwin.amrlhakimi.my',
    github: 'https://github.com/amrlhakimii/nakkahwin',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'wedding planner',
  },
  {
    title: 'VoltaList',
    description: 'A mobile-first futsal session sign-up web app that replaces messy WhatsApp text lists. Captains create sessions, players register their slots — with fair quota enforcement (max 2 entries per player), a dedicated GK slot, and real-time updates. Built to feel like a lightweight companion app, not a management dashboard.',
    stack: ['React 19', 'TypeScript', 'Vite 8', 'TailwindCSS v4', 'Firebase', 'React Router v7'],
    link: 'https://voltalist.amrlhakimi.my',
    github: 'https://github.com/amrlhakimii/voltaList',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'futsal sign-up',
  },
  {
    title: 'Timetable4me',
    description: 'A collab with Waiz (waizhzq) — we built this together. Mobile-first academic schedule tracker and study productivity app. Users sign in with Google, manage their weekly timetable, track tasks with priority scoring, and use a focus timer in Pomodoro or Free mode — all synced to Firebase. Dashboard surfaces today\'s schedule as a visual timeline, upcoming deadlines, weekly stats, and a daily to-do checklist. An auto-scheduler generates study sessions from task deadlines and user preferences. Full week PDF export via jsPDF. ~2,700 lines of TypeScript across 10 source files.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Firebase', 'Anime.js', 'jsPDF', 'Netlify'],
    link: 'https://tt4me.waizhzq.my',
    github: 'https://github.com/waizhzq/timetable4me',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'collab w/ Waiz · schedule & study tracker',
  },
  {
    title: 'PapVision',
    description: 'A freelance project — built in collaboration with a UiTM lecturer to help medical students study cytopathology beyond lecture slides. The lecturer provided the clinical expertise and slide content; I handled the entire technical build. Features 18 annotated Pap smear slides across 5 diagnostic categories, interactive morphology cue markers, a zoomable image viewer, a diagnostic quiz system with hints, and a challenge mode with timed quiz, rapid screening, and randomized cases. Progress tracked with XP, achievements, and category unlocking.',
    stack: ['React 19', 'TypeScript', 'Vite 8', 'TailwindCSS v3', 'Firebase', 'Framer Motion'],
    link: 'https://papvision.amrlhakimi.my',
    github: 'https://github.com/amrlhakimii/papvision',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'cytopathology learning',
  },
  {
    title: 'UbatLog',
    description: "A small clinic tracked every medication purchase by hand in a physical notebook — no search, no filtering, and pricing math (medications bought in one pack size but sold in different unit quantities, e.g. a 28-tablet pack sold in strips of 10) done mentally every time. UbatLog replaces the notebook with a web app built to feel like a smarter version of it, not a database tool: fast to log a new purchase, fast to find an old one, and correct pricing math without anyone doing it by hand. Google Sign-In with an email whitelist enforced by Firestore security rules keeps access closed to a small team. A pricing engine computes cost-per-unit and a 30%-margin recommended price, rounded to the nearest RM0.05, live as you type. Purchase history is grouped by generic medication name rather than brand, mirroring how the physical logbook was organised, with real-time multi-user sync so the admin and family members can use it concurrently. Records are filterable client-side by date range, manufacturer, pharmacy, and type; a standalone calculator checks a recommended price without creating a record; and deletes go through a 5-second undo window before anything is actually removed.",
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS v4', 'Firebase', 'Netlify'],
    link: 'https://ubatlog.amrlhakimi.my',
    github: 'https://github.com/amrlhakimii/UbatLog',
    category: 'software',
    status: 'shipped',
    year: '2026',
    highlight: 'clinic medication purchase log',
  },
  {
    title: 'MyCampus QR Attendance System',
    description: 'iOS React Native app + web platform for UiTM students to record attendance via QR code scanning. Features secure login, attendance records, course registration, custom timetable, and a student academic dashboard. Final Year Project.',
    stack: ['React Native', 'React.js', 'MySQL', 'Expo', 'Node.js', 'TailwindCSS'],
    github: 'https://github.com/amrlhakimii/myCampus',
    category: 'software',
    status: 'in progress',
    year: '2026',
    highlight: 'Final Year Project',
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
    year: '2026',
    highlight: 'you\'re here',
  },
]

const CATEGORY_LABEL = { software: 'Software', ai: 'AI', design: 'Design' } as const

// Status is the only semantic color on this page, toned to sit in the palette.
const STATUS_CONFIG = {
  'shipped':     { color: 'var(--sec)', label: 'Shipped' },
  'in progress': { color: '#d4a64a',    label: 'In progress' },
  'wip':         { color: '#c9824a',    label: 'Work in progress' },
}

const FILTERS = ['all', 'software', 'ai', 'design'] as const

const linkClass = 'inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150'

export default function Projects() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  // Projects with a screenshot lead, featured first. Everything else follows as compact rows.
  const showcase = visible.filter(p => p.image).sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  const rest = [...visible.filter(p => !p.image)].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))

  const stats = [
    { value: projects.length,                                          label: 'total' },
    { value: projects.filter(p => p.status === 'shipped').length,     label: 'shipped' },
    { value: projects.filter(p => p.status === 'in progress').length, label: 'in progress' },
    { value: projects.filter(p => p.featured).length,                 label: 'featured' },
  ]

  return (
    <div className="space-y-8">

      <PageHeader title="Projects" subtitle="Things I've built, shipped, or abandoned at 90%" meta={stats.map(({ value, label }) => `${value} ${label}`).join(' · ')} />

      <div className="fade-up fade-up-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {FILTERS.map((f) => {
          const count = f === 'all' ? projects.length : projects.filter(p => p.category === f).length
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
              {f === 'ai' ? 'AI' : f} <span className="text-[var(--muted)] tabular-nums">{count}</span>
            </button>
          )
        })}
      </div>

      {showcase.length > 0 && (
        <section className="fade-up fade-up-4 space-y-4">
          <SectionLabel aside={<span className="text-xs font-normal tabular-nums text-[var(--muted)]">{showcase.length}</span>}>Selected work</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {showcase.map((project, i) => {
              const sta = STATUS_CONFIG[project.status]
              return (
                <article key={project.title} className={`space-y-4 ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]">
                    <span
                      className="absolute top-3 left-3 z-10 flex flex-col items-center leading-none font-serif text-sm rounded-md px-2 py-1.5"
                      style={{ background: '#f6f3ec', color: project.category === 'design' ? '#c8102e' : '#0a1a33' }}
                      aria-hidden="true"
                    >
                      <span>{CHIP_RANKS[i] ?? ''}</span>
                      <span>{CHIP_SUIT[project.category]}</span>
                    </span>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
                        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className={`w-full object-cover object-top hover:opacity-90 transition-opacity duration-150 ${i === 0 ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'}`} />
                      </a>
                    ) : (
                      <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className={`w-full object-cover object-top ${i === 0 ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'}`} />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h2 className="text-xl font-medium text-[var(--text-pri)]" style={{ letterSpacing: '-0.01em' }}>{project.title}</h2>
                      <span className="flex items-center gap-3 text-xs text-[var(--text-sec)]">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sta.color }} />
                          {sta.label}
                        </span>
                        <span className="text-[var(--muted)] tabular-nums">{project.year}</span>
                      </span>
                    </div>
                    {project.highlight && <p className="text-sm text-[var(--text-pri)]">{project.highlight}</p>}
                    <p className="text-sm text-[var(--text-sec)] leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 rounded border text-[var(--text-sec)]" style={{ borderColor: 'var(--border)', background: 'rgba(var(--border-rgb),0.3)' }}>
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && <span className="text-xs px-1 py-1 text-[var(--muted)]">+{project.stack.length - 6}</span>}
                    </div>
                    {(project.github || project.link) && (
                      <div className="flex gap-3">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-lg font-medium transition-colors duration-150" style={{ background: 'var(--accent-fill)', color: 'var(--on-accent)' }}>
                            Live demo ↗
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="fade-up fade-up-5 space-y-3">
          <SectionLabel aside={<span className="text-xs font-normal tabular-nums text-[var(--muted)]">{rest.length}</span>}>More projects</SectionLabel>
          <div className="border-b border-[var(--border)]">
            {rest.map((project) => {
              const sta = STATUS_CONFIG[project.status]
              const isOpen = expanded === project.title

              return (
                <article
              key={project.title}
              className="border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : project.title)}
                className="w-full text-left p-4 flex gap-4 cursor-pointer"
              >
                <span className="w-12 shrink-0 text-xs tabular-nums text-[var(--muted)] pt-0.5" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>
                  {project.year}
                </span>

                <span className="flex-1 min-w-0 space-y-1">
                  <span className="flex items-start justify-between gap-3 flex-wrap">
                    <span className="font-serif text-xl text-[var(--text-pri)] leading-snug">
                      {project.title}
                      {project.featured && <span className="ml-2 text-xs font-normal text-[var(--muted)]">Featured</span>}
                    </span>
                    <span className="flex items-center gap-3 shrink-0 text-xs text-[var(--text-sec)]">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sta.color }} />
                        {sta.label}
                      </span>
                      <span className="text-[var(--muted)]">{CATEGORY_LABEL[project.category]}</span>
                      <span aria-hidden="true" className="text-[var(--muted)]">{isOpen ? '−' : '+'}</span>
                    </span>
                  </span>
                  {project.highlight && (
                    <span className="block text-xs text-[var(--text-sec)]">{project.highlight}</span>
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-sm text-[var(--text-sec)] leading-relaxed pt-4">{project.description}</p>

                  {project.updates && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[var(--text-pri)]">What's new</p>
                      <ul className="space-y-2">
                        {project.updates.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-sec)] leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[var(--muted)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded border text-[var(--text-sec)]"
                        style={{ borderColor: 'var(--border)', background: 'rgba(var(--border-rgb),0.3)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.github || project.link) && (
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Live demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </article>
              )
            })}
          </div>
        </section>
      )}

      <p className="fade-up fade-up-6 text-xs text-[var(--muted)]">Select a project to expand · {projects.length} total</p>
    </div>
  )
}
