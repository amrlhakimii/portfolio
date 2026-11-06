import { useState, useMemo } from 'react'
import PageHeader from '../components/PageHeader'

interface TILEntry {
  id: number
  content: string
  date: string
  tag: string
  source?: string
}

const entries: TILEntry[] = [
  {
    id: 31,
    content: 'TIL that macOS\'s default unified log recorded that `tcpdump` ran and when, but not which user ran it — a visibility gap that is exactly why enterprises add Sysmon or an EDR agent: process-creation logs with user, command line, and parent process are what make an investigation possible.',
    date: '2026-10-23',
    tag: 'security',
    source: 'learning security logging',
  },
  {
    id: 30,
    content: 'TIL that a failed ping does not mean a server is down — many hosts deliberately drop ICMP. My own site timed out on every ping but answered `curl -I` with `HTTP/2 200` straight away, and the headers showed it was served by Netlify.',
    date: '2026-10-23',
    tag: 'security',
    source: 'learning network basics',
  },
  {
    id: 29,
    content: 'TIL that EF Core optimistic concurrency needs a `[Timestamp]` (or a `RowVersion` byte array) column, not just a manual `UpdatedAt` check — without the DB-enforced token, two concurrent saves can both "succeed" and silently overwrite each other.',
    date: '2026-08-28',
    tag: 'backend',
    source: 'building PolicyIQ paragraph change workflow',
  },
  {
    id: 28,
    content: 'TIL that a three-stage Docker build (deps → build → runtime) keeps the final image small AND lets you use BuildKit secrets to pull from a private package feed without the credential ever landing in a layer — `--mount=type=secret` is scoped to that one RUN instruction.',
    date: '2026-08-14',
    tag: 'docker',
    source: 'containerizing PolicyIQ',
  },
  {
    id: 27,
    content: 'TIL that OIDC login loops in an iframe are almost always a third-party cookie problem — the identity provider sets its session cookie in a cross-site context, the browser blocks it, and the app just keeps redirecting back to login forever. Fixing it meant moving the auth handshake out of the iframe entirely.',
    date: '2026-07-30',
    tag: 'security',
    source: 'fixing PolicyIQ embedded-app auth',
  },
  {
    id: 26,
    content: 'TIL that "tenant isolation" is not one check — it is every query, every foreign key, and every DTO. A single controller that forgets to scope a query by tenant ID is enough to leak another company\'s data, so the safest pattern is baking the tenant filter into the repository layer, not the caller.',
    date: '2026-07-18',
    tag: 'security',
    source: 'hardening PolicyIQ multi-tenancy',
  },
  {
    id: 25,
    content: 'TIL that Firestore security rules run per-document and can\'t easily do cross-collection joins — so an email whitelist check needs the whitelist duplicated into a rules-readable path (like a `/whitelist/{email}` doc) rather than queried from a separate collection at request time.',
    date: '2026-06-25',
    tag: 'firebase',
    source: 'building myRoda auth',
  },
  {
    id: 24,
    content: 'TIL that TanStack Query can bridge a live Firestore `onSnapshot` subscription by calling `queryClient.setQueryData` inside the snapshot callback instead of `refetch` — you get real-time updates while keeping every component on the same cache-driven `useQuery` API.',
    date: '2026-06-10',
    tag: 'firebase',
    source: 'building myRoda dashboard',
  },
  {
    id: 23,
    content: 'TIL that Azure DevOps pipelines can have environment gates — a deployment to preprod can be blocked until a manual approval is given, so nothing reaches production without a deliberate human sign-off.',
    date: '2026-06-02',
    tag: 'devops',
    source: 'Access Group internship',
  },
  {
    id: 22,
    content: 'TIL that the Web Push API requires a service worker to receive push events — the browser needs a background process to wake up and show the notification even when the app tab is closed. Without registering a service worker first, `pushManager.subscribe()` will always fail.',
    date: '2026-05-25',
    tag: 'javascript',
    source: 'building Hootang push notifications',
  },
  {
    id: 21,
    content: 'TIL that GSAP\'s `timeline()` lets you sequence animations with precise overlap control using the position parameter — `tl.to(el, {}, "<0.2")` starts the next tween 0.2s after the previous one begins, not after it ends. This is what makes cinematic entrance sequences feel choreographed instead of just staggered.',
    date: '2026-05-18',
    tag: 'animation',
    source: 'building Hootang dashboard',
  },
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

// Highlight inline code in backticks
function HighlightedContent({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/)
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className="text-[var(--text-pri)] px-1 py-0.5 rounded text-xs"
            style={{ background: 'rgba(var(--border-rgb),0.5)', fontFamily: 'ui-monospace, Consolas, monospace' }}
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
      <PageHeader title="TIL" subtitle="Today I learned: short notes on things that made me stop and think" />

      <section className="fade-up fade-up-2 grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
        {[
          { value: entries.length, label: 'Entries' },
          { value: allTags.length - 1, label: 'Topics' },
          { value: new Set(entries.map(e => e.date.slice(0, 7))).size, label: 'Months' },
        ].map(({ value, label }) => (
          <div key={label} className="space-y-1">
            <p className="text-2xl font-medium tabular-nums text-[var(--gold)]">{value}</p>
            <p className="text-xs text-[var(--text-sec)]">{label}</p>
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
          placeholder="Search entries"
          aria-label="Search entries"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-pri)] placeholder-[var(--muted)] outline-none transition-colors duration-150 focus:border-[var(--border-hover)]"
          style={{ background: 'rgba(var(--bg-rgb),0.5)', fontFamily: 'inherit' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text-pri)] transition-colors duration-150"
          >✕</button>
        )}
      </div>

      {/* Tag filters */}
      <div className="fade-up fade-up-4 flex flex-wrap gap-2">
        {allTags.map(tag => {
          const count = tag === 'all' ? entries.length : entries.filter(e => e.tag === tag).length
          const active = activeTag === tag
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={active}
              className="text-xs px-3 py-2 rounded-lg border transition-colors duration-150"
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
              {tag === 'all' ? 'all' : `#${tag}`} <span className="text-[var(--muted)] tabular-nums">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Entries */}
      <div className="fade-up fade-up-5 border-b border-[var(--border)]">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--muted)] text-sm">No entries match "{search}"</div>
        )}
        {filtered.map((entry) => {
          return (
            <div
              key={entry.id}
              className="group border-t border-[var(--border)] py-5 space-y-3"
            >
              {/* Number + content */}
              <div className="flex gap-3">
                <span
                  className="text-xs tabular-nums shrink-0 mt-0.5 w-5 text-right"
                  style={{ color: 'var(--muted)', fontFamily: 'ui-monospace, Consolas, monospace' }}
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
                  <span className="text-xs text-[var(--text-sec)]">#{entry.tag}</span>
                  {entry.source && (
                    <span className="text-xs text-[var(--muted)]">via {entry.source}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)]">{entry.date}</span>
                  <button
                    onClick={() => handleCopy(entry)}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text-pri)] transition-colors duration-150"
                  >
                    {copied === entry.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-[var(--muted)]">
          Showing {filtered.length} of {entries.length} entries
          {activeTag !== 'all' && ` · filtered by #${activeTag}`}
          {search && ` · searching "${search}"`}
        </p>
      )}
    </div>
  )
}
