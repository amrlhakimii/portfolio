import { useState } from 'react'

interface Friend {
  name: string
  description: string
  relation: 'brother' | 'best friend' | 'groupmate' | 'community'
  emoji: string
  since?: string
  highlight?: string
}

const friends: Friend[] = [
  {
    name: 'Aidil',
    description: 'My brother. Constant support in life decisions and someone I can always rely on when things get overwhelming.',
    relation: 'brother',
    emoji: '🫂',
    since: 'since forever',
    highlight: 'family',
  },
  {
    name: 'Awish',
    description: 'One of the few people who has seen my growth over time. Always supportive and honest when I need it most.',
    relation: 'best friend',
    emoji: '⭐',
    since: 'long time',
    highlight: 'ride or die',
  },
  {
    name: 'Waiz',
    description: 'A dependable friend who motivates me to keep improving and stay focused on long-term goals.',
    relation: 'best friend',
    emoji: '🔥',
    since: 'long time',
    highlight: 'motivator',
  },
  {
    name: 'Jai',
    description: 'Reliable groupmate who consistently contributes ideas and helps keep projects moving forward.',
    relation: 'groupmate',
    emoji: '🛠️',
    since: 'UiTM Tapah',
    highlight: 'builder',
  },
  {
    name: 'Azra',
    description: 'Supportive and easy to work with. Makes collaboration smoother and less stressful.',
    relation: 'groupmate',
    emoji: '✨',
    since: 'UiTM Tapah',
    highlight: 'calm energy',
  },
  {
    name: 'Sal',
    description: 'Brings balance to team discussions and helps ensure work gets completed properly.',
    relation: 'groupmate',
    emoji: '⚖️',
    since: 'UiTM Tapah',
    highlight: 'the anchor',
  },
  {
    name: 'BLU Members',
    description: 'Community that helped shape my creative direction and gave me confidence to keep building and sharing.',
    relation: 'community',
    emoji: '🎨',
    since: 'online',
    highlight: 'creative fam',
  },
]

const relationConfig = {
  'brother':    { color: '#f97316', bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.2)'   },
  'best friend':{ color: '#f0f0db', bg: 'rgba(240,240,219,0.1)',  border: 'rgba(240,240,219,0.2)'  },
  'groupmate':  { color: '#acbac4', bg: 'rgba(172,186,196,0.1)',  border: 'rgba(172,186,196,0.15)' },
  'community':  { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)',  border: 'rgba(167,139,250,0.2)'  },
}

const ALL = 'all'
const FILTERS = [ALL, 'brother', 'best friend', 'groupmate', 'community'] as const

function FriendCard({ person }: { person: Friend }) {
  const [flipped, setFlipped] = useState(false)
  const cfg = relationConfig[person.relation]

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '800px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '160px',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border p-4 space-y-3 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(var(--bg-rgb),0.5)',
            borderColor: cfg.border,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 border"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                {person.emoji}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-pri)]">{person.name}</p>
                <p className="text-[10px]" style={{ color: cfg.color }}>{person.relation}</p>
              </div>
            </div>
            <span className="text-[9px] text-[var(--border-hover)] mt-1">tap to flip</span>
          </div>
          <p className="text-xs text-[var(--text-sec)] leading-relaxed flex-1">{person.description}</p>
          <div className="flex items-center justify-between">
            {person.highlight && (
              <span
                className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border"
                style={{ color: cfg.color, borderColor: cfg.border, background: cfg.bg }}
              >
                {person.highlight}
              </span>
            )}
            {person.since && (
              <span className="text-[10px] text-[var(--border-hover)] ml-auto">{person.since}</span>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border p-5 flex flex-col items-center justify-center text-center gap-2"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: cfg.bg,
            borderColor: cfg.border,
          }}
        >
          <span className="text-4xl">{person.emoji}</span>
          <p className="text-sm font-medium" style={{ color: cfg.color }}>{person.name}</p>
          <p className="text-[10px] text-[var(--text-sec)]">{person.relation} · {person.since}</p>
          <p className="text-[9px] text-[var(--muted)] mt-1">tap to flip back</p>
        </div>
      </div>
    </div>
  )
}

export default function Friends() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>(ALL)

  const visible = filter === ALL ? friends : friends.filter(f => f.relation === filter)

  return (
    <div className="space-y-8">
      <header className="fade-up fade-up-1">
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Friends</h1>
        <p className="text-[var(--text-sec)] text-sm">people i build with, learn from, and grow alongside</p>
      </header>

      {/* Stats row */}
      <section className="fade-up fade-up-2 grid grid-cols-4 gap-2">
        {[
          { value: friends.length, label: 'people' },
          { value: friends.filter(f => f.relation === 'best friend').length, label: 'best friends' },
          { value: friends.filter(f => f.relation === 'groupmate').length, label: 'groupmates' },
          { value: friends.filter(f => f.relation === 'community').length, label: 'communities' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-[var(--border)] p-3 text-center" style={{ background: 'rgba(var(--bg-rgb),0.4)' }}>
            <p className="text-lg font-semibold text-[var(--accent)]">{value}</p>
            <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Filter */}
      <div className="fade-up fade-up-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const cfg = f !== ALL ? relationConfig[f] : null
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[10px] px-3 py-1.5 rounded-full border capitalize transition-all duration-150"
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
              {f}
            </button>
          )
        })}
      </div>

      {/* Cards grid */}
      <div className="fade-up fade-up-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visible.map((person) => (
          <FriendCard key={person.name} person={person} />
        ))}
      </div>

      <p className="fade-up fade-up-5 text-[10px] text-[var(--border)]">
        grateful for everyone here · still meeting more along the way
      </p>
    </div>
  )
}
