import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PlayingCard, JokerCard, type Suit } from '../components/PlayingCard'
import SectionLabel from '../components/SectionLabel'

const STATS = [
  { value: '7+',   label: 'yrs freelancing' },
  { value: '2',    label: 'businesses' },
  { value: '3',    label: 'active projects' },
  { value: '3.76', label: 'cgpa' },
]

// Stat: label, figure. The figure counts up once when it scrolls into view.
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        if (reduce) { setDisplay(value); return }
        const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
        const suffix = value.replace(/[0-9.]/g, '')
        const isDecimal = value.includes('.')
        const duration = 1200
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
    <div ref={ref} className="space-y-1">
      <p className="text-3xl font-medium tabular-nums" style={{ color: 'var(--gold)' }}>{display}</p>
      <p className="text-xs text-[var(--text-sec)]">{label}</p>
    </div>
  )
}

const terminal = [
  { prompt: '$ whoami',      out: 'amirul hakimi — cs graduate · full-stack dev · designer · photographer' },
  { prompt: '$ cat role.txt', out: 'Cybersecurity Technologist - Advanced @ ExxonMobil from Dec 2026 · previously Software Engineer @ Workforce AI, The Access Group' },
  { prompt: '$ cat building.txt', out: 'SOC Detection Lab · Dewasa 101 (AWS infra) · QR Attendance FYP · VoltaList · PapVision (freelance) · Blugrafix · more side projects' },
  { prompt: '$ cat open_to.txt', out: 'cybersecurity · AI engineering · full-stack freelance · freelance design · photography gigs' },
]

// Logo-only stack slider — [file in /public/skills, label for alt/title]
const STACK_ROW_1: [string, string][] = [
  ['react', 'React / React Native'], ['typescript', 'TypeScript'], ['javascript', 'JavaScript'], ['nodejs', 'Node.js'],
  ['csharp', 'C#'], ['dotnetcore', '.NET / ASP.NET Core / EF Core'], ['python', 'Python'], ['java', 'Java'],
  ['cplusplus', 'C++'], ['php', 'PHP'], ['mysql', 'MySQL'], ['sqlserver', 'SQL Server'], ['firebase', 'Firebase'],
  ['supabase', 'Supabase'], ['expo', 'Expo'], ['databricks', 'Databricks'], ['linux', 'Linux'],
]
const STACK_ROW_2: [string, string][] = [
  ['tailwindcss', 'TailwindCSS'], ['vite', 'Vite'], ['git', 'Git'], ['github', 'GitHub'], ['githubactions', 'GitHub Actions'],
  ['githubcopilot', 'GitHub Copilot'], ['docker', 'Docker'], ['azure', 'Microsoft Azure'], ['azuredevops', 'Azure DevOps'],
  ['aws', 'AWS'], ['terraform', 'Terraform'], ['reactrouter', 'React Router'], ['framermotion', 'Framer Motion'], ['gsap', 'GSAP'],
  ['jwt', 'JWT'], ['splunk', 'Splunk'], ['wireshark', 'Wireshark'], ['powershell', 'PowerShell'],
  ['photoshop', 'Photoshop'], ['illustrator', 'Illustrator'], ['affinity', 'Affinity Designer'], ['premiere', 'Premiere Pro'],
  ['davinci', 'DaVinci Resolve'], ['lightroom', 'Lightroom'], ['figma', 'Figma'], ['canva', 'Canva'], ['aftereffects', 'After Effects'],
]


const ROLES = ['Cybersecurity', 'Full-stack dev', 'Photographer', 'Videographer', 'Editor', 'Graphic designer', 'AI engineering']

const HAND: { rank: string; suit: Suit; title: string; desc: string }[] = [
  { rank: 'Q', suit: '♥', title: 'Photography', desc: 'Weddings, events, products, corporate shoots' },
  { rank: 'J', suit: '♦', title: 'Graphic design', desc: 'Branding, social media, print, jersey artwork' },
  { rank: 'K', suit: '♣', title: 'Full-stack dev', desc: 'React, TypeScript, Node.js, Supabase, Firebase. Web or mobile, end to end' },
  { rank: '10', suit: '♠', title: 'AI engineering', desc: 'Prompt engineering, LLM integration, AI-powered workflows' },
  { rank: 'A', suit: '♠', title: 'Cybersecurity', desc: 'Detection rules, log analysis, security-minded builds' },
]

const HAND_ROTATE = [-15, -9, -3, 3, 9, 15]


const TEASER_PROJECTS = [
  { title: 'Dewasa 101', note: 'Personal finance tracker, AWS infra from scratch', image: '/projects/dewasa.png' },
  { title: 'Hootang', note: 'Expense and IOU tracker, installable PWA', image: '/projects/hootang.png' },
  { title: 'myRoda', note: 'Vehicle maintenance and fuel tracker', image: '/projects/myroda.png' },
]

const TEASER_PHOTOS = ['/1.png', '/3.png', '/5.png', '/6.png']

export default function About() {
  return (
    <div className="space-y-16">

      <header className="on-red fade-up fade-up-1 rounded-3xl p-6 sm:p-10 sm:-mx-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-10">

          <div className="flex-1 space-y-6 min-w-0">
            <p className="text-xs" style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent)' }}>//</span> portfolio 2026
            </p>

            <div className="space-y-3">
              <h1 className="font-serif" style={{ fontSize: 'clamp(3.5rem, 14vw, 6.5rem)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.035em', color: 'var(--text-pri)' }}>
                Amirul<br />Hakimi<span style={{ color: 'var(--gold-on-red)' }}>.</span>
              </h1>
              <p className="text-base text-[var(--text-sec)] max-w-prose">
                Software engineer in Malaysia, moving into cybersecurity. I also design, shoot and edit.
              </p>
            </div>

            <p className="text-sm text-[var(--text-sec)]">
              {ROLES.join(' · ')}
            </p>

            <p className="flex items-center gap-2 text-sm text-[var(--text-pri)]">
              <span className="sec-dot" aria-hidden="true" />
              Joining ExxonMobil as Cybersecurity Technologist - Advanced, Dec 2026
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="mailto:amirulxhakimi@gmail.com"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                style={{ background: 'var(--accent-fill)', color: 'var(--on-accent)' }}
              >
                Email me
              </a>
              <a
                href="/AmirulHakimiCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm text-[var(--text-pri)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-150"
              >
                Open CV
              </a>
              <div className="flex items-center gap-1">
              {[
                {
                  label: 'GitHub',
                  href: 'https://github.com/amrlhakimii',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/amrlhakimii/',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  label: 'X / Twitter',
                  href: 'https://x.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/amrlhakimii',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  href: 'mailto:amirulxhakimi@gmail.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text-pri)] hover:bg-[rgba(var(--border-rgb),0.4)] transition-colors duration-150"
                >
                  {icon}
                </a>
              ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-60 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] h-80 sm:h-[22rem]">
              <img
                src="/avatar.jpg"
                alt="Amirul Hakimi"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-2">
              {[
                { src: '/arsenal.png', alt: 'Arsenal', title: 'Arsenal FC', sub: 'Die-hard gooner' },
                { src: '/merccedes.png', alt: 'Mercedes', title: 'Mercedes AMG F1', sub: 'Silver arrows' },
              ].map(({ src, alt, title, sub }) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="w-9 h-7 rounded bg-white flex items-center justify-center shrink-0">
                    <img src={src} alt={alt} className="w-6 h-4 object-contain" />
                  </span>
                  <p className="text-xs text-[var(--text-pri)]">{title}<span className="text-[var(--muted)]"> · {sub}</span></p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </header>

      <section className="fade-up fade-up-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[var(--border)]">
          {STATS.map(({ value, label }) => (
            <AnimatedStat key={label} value={value} label={label} />
          ))}
        </div>
      </section>



      <section className="fade-up fade-up-3">
        <p className="font-serif max-w-[22ch]" style={{ fontSize: 'clamp(2rem, 5.5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500 }}>
          Software engineer turned <span style={{ color: 'var(--accent)' }}>cybersecurity</span> technologist. I design, shoot and edit on the side.
        </p>
      </section>

      <section className="fade-up fade-up-4 space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <SectionLabel>Selected work</SectionLabel>
          <Link to="/projects" className="text-xs text-[var(--text-sec)] hover:text-[var(--accent)] transition-colors duration-150">All projects →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEASER_PROJECTS.map(({ title, note, image }) => (
            <Link key={title} to="/projects" className="group space-y-3">
              <img src={image} alt={`${title} screenshot`} loading="lazy" className="w-full aspect-[4/3] object-cover object-top rounded-xl border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-colors duration-150" />
              <span className="block">
                <span className="block font-serif text-xl text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">{title}</span>
                <span className="block text-xs text-[var(--text-sec)] mt-1">{note}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="fade-up fade-up-5 space-y-8">
        <div className="grid md:grid-cols-3 gap-8 border-t border-[var(--border)] pt-10">
          {[
            { n: '01', title: 'Engineering', body: 'React, TypeScript, C# and .NET, shipped through Docker and Azure. I joined Access as an Associate Project Coordinator and moved into real engineering work.' },
            { n: '02', title: 'Security', body: 'Joining ExxonMobil as a Cybersecurity Technologist. A home SOC lab with Sigma and Splunk rules, mapped to MITRE ATT&CK and checked in Python.' },
            { n: '03', title: 'Creative', body: 'Photographer since 2018, video editor, and founder of Blugrafix, my graphic design and jersey printing business.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="space-y-2">
              <p className="text-xs" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}><span className="text-[var(--accent)]">{n}</span> <span className="text-[var(--muted)]">{title}</span></p>
              <p className="text-sm text-[var(--text-sec)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <details className="group border-y border-[var(--border)]">
          <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-sm text-[var(--text-pri)] hover:text-[var(--accent)] transition-colors duration-150">
            <span>Read the full story</span>
            <span className="text-[var(--muted)] group-open:hidden" aria-hidden="true">+</span>
            <span className="text-[var(--muted)] hidden group-open:inline" aria-hidden="true">−</span>
          </summary>
          <div className="pb-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-sm text-[var(--text-sec)] leading-relaxed">
            <p>I'm a CS graduate from UiTM Tapah — First Class Honours in my diploma, <span className="text-[var(--text-pri)]">3.76 CGPA</span> on
          the degree — who spent 2026 as a Software Engineer on the Workforce AI team at{' '}
          <span className="text-[var(--text-pri)]">The Access Group APAC</span> and is joining{' '}
          <span className="text-[var(--text-pri)]">ExxonMobil</span> in Kuala Lumpur this December as a
          Cybersecurity Technologist - Advanced. I didn't start at Access as an engineer, though:
          I came in as an Associate Project Coordinator, and got handed real engineering work
          once it was clear I could do it.</p>
            <p>Day to day that means <span className="text-[var(--text-pri)]">React and TypeScript</span> on the frontend, <span className="text-[var(--text-pri)]">C#/.NET and Node.js</span> on
          the backend, deployed through Docker and Azure. My final-year project paired a React
          Native iOS app with a MySQL-backed web dashboard for QR attendance tracking — mobile
          and web, same as most of what I still build. Lately I'm pulling AI further into the
          actual workflow, not just the autocomplete — prompt engineering and LLM integration
          as part of how things actually ship.</p>
            <p>The next chapter is <span className="text-[var(--text-pri)]">cybersecurity</span>. Working on PolicyIQ, a
          governance, risk and compliance platform, got me thinking about the defending side, so I'm
          learning it properly: networking basics, reading logs, and a home{' '}
          <span className="text-[var(--text-pri)]">SOC detection lab</span> where I write Sigma and Splunk
          rules, map them to MITRE ATT&CK, and automate checks in Python. Still early, still learning in public.</p>
            <p>Before any of this was a job title, I was cutting video. I interned at <span className="text-[var(--text-pri)]">Rev Media
          Group & Media Prima</span>, directing and editing OBTV — a nightly TV9 show — and working
          videographer and gaffer for OhBulan!'s YouTube podcast. I also shot events for VOCKET,
          including Hausboom Music 2023 and Aina Abdul's concert press conference.</p>
            <p>On the side, I run <span className="text-[var(--text-pri)]">Blugrafix</span> — my own graphic design and jersey sublimation
          business — and I've shot weddings, corporate events, and product launches as a
          freelance photographer since 2018. I also spent four years volunteering as a designer
          for Youths.My.</p>
            <p>What keeps me interested in engineering is the layer underneath the interface —
            how an API is actually structured, how an auth model holds up under real load, how
            a build gets from a laptop to production without anyone babysitting it. Stack
            details are below; AI tooling is folding into that same layer now, not sitting
            beside it as a novelty.</p>
            <p><span className="text-[var(--text-pri)]">Photography</span> is the constant — finding the right frame still feels the same as it
            did before any of it paid. <span className="text-[var(--text-pri)]">Design</span> lives right next to it, from brand identities to
            print-ready jersey art. Truth is I mess around in VS Code more than After Effects —
            side projects are as much a hobby as anything creative on this page.</p>
            <p>Culturally: I follow <span className="text-[var(--text-pri)]">Arsenal</span> religiously — the kind of fan that watches every match,
            checks the lineup 30 minutes before kickoff, and feels physical pain during injury time.
            I also follow <span className="text-[var(--text-pri)]">Formula 1</span> closely, specifically Mercedes AMG Petronas. The overlap between
            race strategy, engineering, and split-second decision-making genuinely fascinates me.</p>
            <p>Other things I enjoy: good playlists, discovering new music, and <span className="text-[var(--text-pri)]">videography</span> — especially
            the editing side. I find the narrative structure of a well-cut video as satisfying as shipping
            clean code.</p>
          </div>
        </details>
      </section>

      <section className="fade-up fade-up-4">
        <div className="rounded-xl overflow-hidden border border-[var(--border)]" style={{ background: 'rgba(10,15,28,0.8)' }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#98a1b6]" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>zsh — amrlhakimii</span>
          </div>
          <div className="px-4 py-4 space-y-3">
            {terminal.map(({ prompt, out }) => (
              <div key={prompt}>
                <p className="text-xs" style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: '#f0f0db' }}>{prompt}</p>
                <p className="text-xs mt-1 pl-2" style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: '#acbac4' }}>→ {out}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-up fade-up-6 space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <SectionLabel>Behind the lens</SectionLabel>
          <Link to="/photography" className="text-xs text-[var(--text-sec)] hover:text-[var(--accent)] transition-colors duration-150">All photography →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEASER_PHOTOS.map((src, i) => (
            <Link key={src} to="/photography">
              <img src={src} alt="" loading="lazy" className={`w-full object-cover rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-150 ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`} />
            </Link>
          ))}
        </div>
      </section>

      <section className="fade-up fade-up-7 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-10">
        <div className="md:sticky md:top-6 self-start"><SectionLabel>Stack</SectionLabel></div>
        <div className="space-y-3 min-w-0">
        <div className="flex flex-wrap gap-2">
          {[...STACK_ROW_1, ...STACK_ROW_2].map(([file, name]) => (
            <div key={file} className="w-10 h-10 rounded-lg border border-[var(--border)] bg-white flex items-center justify-center">
              <img src={`/skills/${file}.svg`} alt={name} title={name} loading="lazy" className="w-6 h-6 object-contain" />
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="fade-up fade-up-9 space-y-10">
        <div className="space-y-3">
          <SectionLabel>Work with me</SectionLabel>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 500 }}>
            <span style={{ color: 'var(--accent)' }}>Jack</span> of all trades.
          </h2>
          <p className="text-sm text-[var(--text-sec)] max-w-prose">
            Five suits and a wildcard. I'd rather know how the whole thing fits together than only one corner of it.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-0 sm:pt-6 sm:pb-4">
          {HAND.map((card, i) => (
            <PlayingCard key={card.title} {...card} rotate={HAND_ROTATE[i]} />
          ))}
          <JokerCard rotate={HAND_ROTATE[HAND.length]} caption="wildcard" />
        </div>
      </section>

    </div>
  )
}
