import { useState } from 'react'
import PageHeader from '../components/PageHeader'

interface Friend {
  name: string
  description: string
  relation: 'brother' | 'best friend' | 'groupmate' | 'community'
  since?: string
  highlight?: string
  link?: string
}

const friends: Friend[] = [
  {
    name: 'Aidil',
    description: 'My brother. Constant support in life decisions and someone I can always rely on when things get overwhelming.',
    relation: 'brother',
    since: 'since forever',
    highlight: 'family',
    link: 'https://aidilsfwn.dev',
  },
  {
    name: 'Awish',
    description: 'One of the few people who has seen my growth over time. Always supportive and honest when I need it most.',
    relation: 'best friend',
    since: 'long time',
    highlight: 'ride or die',
  },
  {
    name: 'Waiz',
    description: 'A dependable friend who motivates me to keep improving and stay focused on long-term goals.',
    relation: 'best friend',
    since: 'long time',
    highlight: 'motivator',
    link: 'https://waizhzq.my',
  },
  {
    name: 'Zharif',
    description: 'Diploma friend who stayed around after the chapter ended. Good energy, easy to vibe with.',
    relation: 'groupmate',
    since: 'diploma',
    highlight: 'diploma homie',
    link: 'https://zharifzhafran.xyz',
  },
  {
    name: 'Jai',
    description: 'Reliable groupmate who consistently contributes ideas and helps keep projects moving forward.',
    relation: 'groupmate',
    since: 'UiTM Tapah',
    highlight: 'builder',
  },
  {
    name: 'Azra',
    description: 'Supportive and easy to work with. Makes collaboration smoother and less stressful.',
    relation: 'groupmate',
    since: 'UiTM Tapah',
    highlight: 'calm energy',
  },
  {
    name: 'Sal',
    description: 'Brings balance to team discussions and helps ensure work gets completed properly.',
    relation: 'groupmate',
    since: 'UiTM Tapah',
    highlight: 'the anchor',
  },
  {
    name: 'BLU Members',
    description: 'Community that helped shape my creative direction and gave me confidence to keep building and sharing.',
    relation: 'community',
    since: 'online',
    highlight: 'creative fam',
  },
]

const ALL = 'all'
const FILTERS = [ALL, 'brother', 'best friend', 'groupmate', 'community'] as const

export default function Friends() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>(ALL)

  const visible = filter === ALL ? friends : friends.filter(f => f.relation === filter)

  const stats = [
    { value: friends.length, label: 'people' },
    { value: friends.filter(f => f.relation === 'best friend').length, label: 'best friends' },
    { value: friends.filter(f => f.relation === 'groupmate').length, label: 'groupmates' },
    { value: friends.filter(f => f.relation === 'community').length, label: 'communities' },
  ]

  return (
    <div className="space-y-10">
      <PageHeader
        title="Friends"
        subtitle="People I build with, learn from, and grow alongside"
        meta={stats.map(({ value, label }) => `${value} ${label}`).join(' · ')}
      />

      <div className="fade-up fade-up-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter by relation">
        {FILTERS.map((f) => {
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
              {f}
            </button>
          )
        })}
      </div>

      <ul className="fade-up fade-up-4 border-b border-[var(--border)]">
        {visible.map((person) => (
          <li key={person.name} className="border-t border-[var(--border)] py-5 grid md:grid-cols-[13rem_1fr] gap-2 md:gap-8">
            <div>
              <p className="font-serif text-xl text-[var(--text-pri)]">{person.name}</p>
              <p className="text-xs text-[var(--muted)] capitalize mt-1">
                {person.relation}{person.since && ` · ${person.since}`}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[var(--text-sec)] leading-relaxed max-w-prose">{person.description}</p>
              {(person.highlight || person.link) && (
                <p className="text-xs flex items-center gap-3 flex-wrap">
                  {person.highlight && <span className="text-[var(--gold)]">{person.highlight}</span>}
                  {person.link && (
                    <a href={person.link} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-150">
                      {person.link.replace(/^https?:\/\//, '')} ↗
                    </a>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="fade-up fade-up-5 text-xs text-[var(--muted)]">
        Grateful for everyone here. Still meeting more along the way.
      </p>
    </div>
  )
}
