import { useState, useMemo } from 'react'

interface TILEntry {
  id: number
  content: string
  date: string
  tag: string
  source?: string
}

const entries: TILEntry[] = [
  {
    id: 20,
    content: 'TIL that writing a good AI prompt is closer to writing a spec than a search query — the more context, constraints, and expected output format you give, the less hallucination and the more useful the result.',
    date: '2026-05-10',
    tag: 'ai',
    source: 'daily workflow',
  },
  {
    id: 19,
    content: 'TIL that using AI to draft a PRD before writing code exposes scope gaps and ambiguous requirements you\'d normally only catch mid-build. Treating the AI as a skeptical PM catches issues before they cost hours.',
    date: '2026-05-01',
    tag: 'ai',
    source: 'building PapVision & VoltaList',
  },
  {
    id: 18,
    content: 'TIL that Firebase Firestore\'s `onSnapshot` gives you real-time document updates without any polling — but you must unsubscribe (return the function from `useEffect`) or you silently accumulate listeners that never clean up.',
    date: '2026-04-20',
    tag: 'firebase',
    source: 'building VoltaList',
  },
  {
    id: 17,
    content: 'TIL that TailwindCSS v4 replaces `tailwind.config.js` entirely with a CSS-first `@theme` block. No JS config, no `content` array — just a single CSS entry point. Felt wrong at first, then immediately right.',
    date: '2026-03-10',
    tag: 'css',
    source: 'Tailwind v4 docs',
  },
  {
    id: 16,
    content: 'TIL that Framer Motion\'s `AnimatePresence` is the only way to animate elements on exit — without it, React unmounts the element immediately and the exit animation never runs.',
    date: '2026-02-14',
    tag: 'react',
    source: 'building PapVision',
  },
  {
    id: 15,
    content: 'TIL that Firebase Auth\'s `onAuthStateChanged` is async — your UI should always start in a loading state and wait for the first callback. Skip this and you get a flash of the wrong screen on every load.',
    date: '2026-01-08',
    tag: 'firebase',
    source: 'building VoltaList & PapVision',
  },
  {
    id: 14,
    content: 'TIL that React Router v7 introduces `loaders` — async functions that resolve data before a route renders. Eliminates the `useEffect`-on-mount fetch pattern and makes loading states part of the routing, not the component.',
    date: '2025-10-22',
    tag: 'react',
    source: 'React Router v7 docs',
  },
  {
    id: 13,
    content: 'TIL that Supabase Row Level Security (RLS) lets you define read/write rules directly in the database — you stop reimplementing the same auth checks in every API route and just let the DB enforce it.',
    date: '2025-07-14',
    tag: 'databases',
    source: 'building AutoLog MY',
  },
  {
    id: 1,
    content: 'TIL about React hydration — the process of attaching event listeners to server-rendered HTML so React can take over on the client.',
    date: '2025-03-18',
    tag: 'react',
    source: 'React docs',
  },
  {
    id: 2,
    content: 'TIL the difference between SQL and NoSQL indexing. NoSQL databases often rely on partition keys and secondary indexes, while SQL uses B-tree structures by default.',
    date: '2025-03-12',
    tag: 'databases',
    source: 'deep dive',
  },
  {
    id: 3,
    content: 'TIL about CSS `content-visibility: auto` — it skips rendering off-screen content, which can dramatically improve initial page load performance.',
    date: '2025-03-05',
    tag: 'css',
    source: 'web.dev',
  },
  {
    id: 4,
    content: 'TIL that TypeScript `satisfies` operator (4.9+) validates a value against a type without widening it — super useful for config objects.',
    date: '2025-02-28',
    tag: 'typescript',
    source: 'TS release notes',
  },
  {
    id: 5,
    content: 'TIL about the Temporal Dead Zone in JavaScript — let and const bindings exist from the start of the block but cannot be accessed until the declaration is reached.',
    date: '2025-02-20',
    tag: 'javascript',
    source: 'MDN',
  },
  {
    id: 6,
    content: 'TIL that git bisect can be automated with a script — pass a test command and it binary-searches your commit history to find the first bad commit.',
    date: '2025-02-14',
    tag: 'git',
    source: 'git docs',
  },
  {
    id: 7,
    content: 'TIL that `IntersectionObserver` is way more performant than listening to scroll events for detecting when elements enter the viewport.',
    date: '2025-02-08',
    tag: 'javascript',
    source: 'experimentation',
  },
  {
    id: 8,
    content: 'TIL about CSS `@layer` — it lets you explicitly define cascade layers, giving you predictable control over specificity without !important hacks.',
    date: '2025-01-30',
    tag: 'css',
    source: 'Tailwind v4 docs',
  },
  {
    id: 9,
    content: 'TIL that React `useRef` persists across renders without causing re-renders — useful for storing mutable values like timers, animation frame IDs, or previous state.',
    date: '2025-01-22',
    tag: 'react',
    source: 'building this portfolio',
  },
  {
    id: 10,
    content: 'TIL about `requestAnimationFrame` — syncs JS execution to the browser paint cycle, making animations buttery smooth without overloading the main thread.',
    date: '2025-01-15',
    tag: 'javascript',
    source: 'canvas experiments',
  },
  {
    id: 11,
    content: 'TIL that Figma auto-layout behaves like CSS flexbox — once that clicked, I stopped fighting it and started building components properly.',
    date: '2025-01-10',
    tag: 'design',
    source: 'Figma practice',
  },
  {
    id: 12,
    content: 'TIL that Adobe Lightroom\'s masking tool with AI subject detection is insanely good — selective edits that used to take 10 minutes now take 10 seconds.',
    date: '2025-01-05',
    tag: 'photography',
    source: 'post-processing a wedding shoot',
  },
]

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  react:       { color: '#61dafb', bg: 'rgba(97,218,251,0.08)',   border: 'rgba(97,218,251,0.2)'  },
  typescript:  { color: '#acbac4', bg: 'rgba(172,186,196,0.08)',  border: 'rgba(172,186,196,0.2)' },
  javascript:  { color: '#f7df1e', bg: 'rgba(247,223,30,0.08)',   border: 'rgba(247,223,30,0.2)'  },
  css:         { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)' },
  databases:   { color: '#34d399', bg: 'rgba(52,211,153,0.08)',   border: 'rgba(52,211,153,0.2)'  },
  git:         { color: '#f97316', bg: 'rgba(249,115,22,0.08)',   border: 'rgba(249,115,22,0.2)'  },
  design:      { color: '#f9a8d4', bg: 'rgba(249,168,212,0.08)',  border: 'rgba(249,168,212,0.2)' },
  photography: { color: '#e1d9bc', bg: 'rgba(225,217,188,0.08)',  border: 'rgba(225,217,188,0.2)' },
  firebase:    { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',   border: 'rgba(251,191,36,0.2)'  },
  ai:          { color: '#e879f9', bg: 'rgba(232,121,249,0.08)',  border: 'rgba(232,121,249,0.2)' },
}

const fallbackTag = { color: '#acbac4', bg: 'rgba(172,186,196,0.08)', border: 'rgba(172,186,196,0.2)' }

// Highlight inline code in backticks
function HighlightedContent({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/)
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className="text-[var(--accent)] px-1 py-0.5 rounded text-[11px]"
            style={{ background: 'rgba(240,240,219,0.1)', fontFamily: 'monospace' }}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export default function TIL() {
  const [activeTag, setActiveTag] = useState('all')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<number | null>(null)

  const allTags = useMemo(() => ['all', ...Array.from(new Set(entries.map(e => e.tag)))], [])

  const filtered = useMemo(() =>
    entries.filter(e => {
      const matchTag = activeTag === 'all' || e.tag === activeTag
      const matchSearch = search === '' || e.content.toLowerCase().includes(search.toLowerCase())
      return matchTag && matchSearch
    }),
  [activeTag, search])

  const handleCopy = (entry: TILEntry) => {
    navigator.clipboard.writeText(entry.content)
    setCopied(entry.id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-8">
      <header className="fade-up fade-up-1">
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3" style={{ letterSpacing: "-0.02em", lineHeight: "1" }}>TIL</h1>
        <p className="text-[var(--text-sec)] text-sm">today i learned — short notes on things that made me stop and think</p>
      </header>

      {/* Stats */}
      <section className="fade-up fade-up-2 grid grid-cols-3 gap-2">
        {[
          { value: entries.length, label: 'entries' },
          { value: allTags.length - 1, label: 'topics' },
          { value: new Set(entries.map(e => e.date.slice(0, 7))).size, label: 'months' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[var(--border)] p-3 text-center" style={{ background: 'rgba(var(--bg-rgb),0.4)' }}>
            <p className="text-lg font-semibold text-[var(--accent)]">{value}</p>
            <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Search */}
      <div className="fade-up fade-up-3 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="search entries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-pri)] placeholder-[var(--border-hover)] outline-none transition-colors duration-150 focus:border-[var(--border-hover)]"
          style={{ background: 'rgba(var(--bg-rgb),0.5)', fontFamily: 'inherit' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--border-hover)] hover:text-[var(--text-sec)] transition-colors"
          >✕</button>
        )}
      </div>

      {/* Tag filters */}
      <div className="fade-up fade-up-4 flex flex-wrap gap-2">
        {allTags.map(tag => {
          const cfg = tag !== 'all' ? (TAG_COLORS[tag] ?? fallbackTag) : null
          const count = tag === 'all' ? entries.length : entries.filter(e => e.tag === tag).length
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="text-[10px] px-3 py-1.5 rounded-full border transition-all duration-150 flex items-center gap-1.5"
              style={activeTag === tag ? {
                background: cfg ? cfg.bg : 'rgba(240,240,219,0.1)',
                borderColor: cfg ? cfg.border : 'rgba(240,240,219,0.2)',
                color: cfg ? cfg.color : 'var(--accent)',
              } : {
                background: 'rgba(var(--bg-rgb),0.3)',
                borderColor: 'var(--border)',
                color: 'var(--muted)',
              }}
            >
              #{tag}
              <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Entries */}
      <div className="space-y-3 fade-up fade-up-5">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--border-hover)] text-sm">no entries match "{search}"</div>
        )}
        {filtered.map((entry) => {
          const cfg = TAG_COLORS[entry.tag] ?? fallbackTag
          return (
            <div
              key={entry.id}
              className="group border rounded-xl p-4 space-y-3 transition-all duration-150 hover:-translate-y-0.5"
              style={{ borderColor: 'var(--border)', background: 'rgba(var(--bg-rgb),0.45)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = cfg.border}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
            >
              {/* Number + content */}
              <div className="flex gap-3">
                <span
                  className="text-[11px] tabular-nums shrink-0 mt-0.5 w-5 text-right"
                  style={{ color: 'var(--border-hover)', fontFamily: 'monospace' }}
                >
                  {String(entry.id).padStart(2, '0')}
                </span>
                <p className="text-[var(--text-pri)] text-sm leading-relaxed flex-1">
                  <HighlightedContent text={entry.content} />
                </p>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between pl-8">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full border"
                    style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
                  >
                    #{entry.tag}
                  </span>
                  {entry.source && (
                    <span className="text-[10px] text-[var(--border-hover)]">via {entry.source}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[var(--border-hover)]">{entry.date}</span>
                  <button
                    onClick={() => handleCopy(entry)}
                    className="text-[10px] text-[var(--border-hover)] hover:text-[var(--text-sec)] transition-colors duration-150 opacity-0 group-hover:opacity-100"
                  >
                    {copied === entry.id ? '✓ copied' : 'copy'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length > 0 && (
        <p className="text-[10px] text-[var(--border)]">
          showing {filtered.length} of {entries.length} entries
          {activeTag !== 'all' && ` · filtered by #${activeTag}`}
          {search && ` · searching "${search}"`}
        </p>
      )}
    </div>
  )
}
