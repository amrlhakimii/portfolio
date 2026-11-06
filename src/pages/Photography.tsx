import { useState } from 'react'
import SectionLabel from '../components/SectionLabel'

const SUIT: Record<string, { glyph: string; red: boolean }> = {
  weddings: { glyph: '♥', red: true },
  events: { glyph: '♦', red: true },
  street: { glyph: '♠', red: false },
}
import PageHeader from '../components/PageHeader'

interface Photo {
  id: number
  src: string
  alt: string
  category: string
  location?: string
}

const photos: Photo[] = [
  { id: 1,  src: '/1.png',  alt: 'Convocation',           category: 'street',    location: 'Perak' },
  { id: 2,  src: '/2.png',  alt: 'Football match',            category: 'events',    location: 'Kedah' },
  { id: 3,  src: '/3.png',  alt: 'Wedding ceremony',  category: 'weddings',  location: 'Kedah'    },
  { id: 4,  src: '/4.png',  alt: 'TapauFest2023',                 category: 'events',    location: 'Perak' },
  { id: 5,  src: '/5.png',  alt: 'Hausboom2023',                category: 'events',  location: 'Kedah'    },
  { id: 6,  src: '/6.png',  alt: 'Sunflower field',              category: 'street',    location: 'Perlis'       },
]

const gear = [
  { name: 'Fujifilm XT30-ii',  role: 'Primary body' },
  { name: 'iPhone',            role: 'Casual and behind the scenes' },
  { name: 'Adobe Lightroom',   role: 'Culling and editing' },
  { name: 'Adobe Photoshop',   role: 'Retouching' },
]

const stats = [
  { value: '7+',   label: 'Years shooting' },
  { value: '30+',  label: 'Events covered' },
  { value: '2018', label: 'First paid gig' },
]

const CATEGORIES = ['all', 'weddings', 'events', 'street']

export default function Photography() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  const filtered = activeCategory === 'all' ? photos : photos.filter(p => p.category === activeCategory)

  return (
    <div className="space-y-8">

      <PageHeader title="Photography" subtitle="Frames I've kept: weddings, events, street, everyday moments" action={
          <a href="https://www.instagram.com/kimiflickr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150">@kimiflickr</a>
        } />

      <section className="fade-up fade-up-2 grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border)]">
        {stats.map(({ value, label }) => (
          <div key={label} className="space-y-1">
            <p className="text-2xl font-medium tabular-nums text-[var(--gold)]">{value}</p>
            <p className="text-xs text-[var(--text-sec)]">{label}</p>
          </div>
        ))}
      </section>

      <div className="fade-up fade-up-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter photos by category">
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveCategory(cat)}
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
              {cat} {cat !== 'all' && <span className="text-[var(--muted)] tabular-nums">{photos.filter(p => p.category === cat).length}</span>}
            </button>
          )
        })}
      </div>

      <div className="fade-up fade-up-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightbox(photo)}
            className={`text-left space-y-2 cursor-pointer ${i === 0 ? 'col-span-2 lg:col-span-3' : ''}`}
          >
            <span className="relative block">
                          <img
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover rounded-xl border border-[var(--border)] ${i === 0 ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'}`}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3' }}
              />
              <span
                className="absolute top-2 left-2 flex flex-col items-center leading-none font-serif text-xs rounded px-1.5 py-1"
                style={{ background: '#f6f3ec', color: SUIT[photo.category]?.red ? '#c8102e' : '#0a1a33' }}
                aria-hidden="true"
              >
                <span>{['A', '2', '3', '4', '5', '6'][i] ?? ''}</span>
                <span>{SUIT[photo.category]?.glyph}</span>
              </span>
            </span>
            <span className="block text-xs text-[var(--text-pri)]">
              {photo.alt}
              {photo.location && <span className="text-[var(--muted)]"> · {photo.location}</span>}
            </span>
          </button>
        ))}
      </div>

      <section className="fade-up fade-up-5 space-y-3">
        <SectionLabel>Behind the lens</SectionLabel>
        <ul className="border-b border-[var(--border)]">
          {gear.map(({ name, role }) => (
            <li key={name} className="border-t border-[var(--border)] py-4 flex items-baseline justify-between gap-4">
              <span className="font-serif text-lg text-[var(--text-pri)]">{name}</span>
              <span className="text-xs text-[var(--text-sec)]">{role}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="fade-up fade-up-6 text-xs text-[var(--muted)]">
        More photos coming soon. Follow @kimiflickr for the full work.
      </p>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(5,12,26,0.95)' }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <div className="relative max-w-2xl w-full space-y-3" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full rounded-xl object-contain"
              style={{ maxHeight: '75vh' }}
            />
            <p className="text-sm text-[var(--text-pri)]">
              {lightbox.alt}
              <span className="text-xs text-[var(--muted)]"> · <span className="capitalize">{lightbox.category}</span>{lightbox.location ? ` · ${lightbox.location}` : ''}</span>
            </p>
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--text-pri)] transition-colors duration-150"
              style={{ background: 'rgba(var(--bg-rgb),0.9)', border: '1px solid var(--border)' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
