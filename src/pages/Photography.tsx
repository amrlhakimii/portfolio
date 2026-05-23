import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  { name: 'Fujifilm XT30-ii',           role: 'primary body',      icon: '📷' },
  { name: 'iPhone',               role: 'casual + bts',      icon: '📱' },
  { name: 'Adobe Lightroom',      role: 'culling + editing',  icon: '🎞️' },
  { name: 'Adobe Photoshop',      role: 'retouching',         icon: '✏️' },
]

const stats = [
  { value: '7+', label: 'years shooting' },
  { value: '30+', label: 'events covered' },
  { value: '2018', label: 'first paid gig' },
  { value: '∞',   label: 'shutter clicks' },
]

const CATEGORIES = ['all', 'weddings', 'events', 'street']

export default function Photography() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  const filtered = activeCategory === 'all' ? photos : photos.filter(p => p.category === activeCategory)

  // Lens rings parallax
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: pageScroll } = useScroll({ target: pageRef, offset: ['start start', 'end start'] })
  const lensScale1 = useTransform(pageScroll, [0, 0.5], [1, 2.2])
  const lensScale2 = useTransform(pageScroll, [0, 0.5], [1, 1.7])
  const lensOpacity = useTransform(pageScroll, [0, 0.35], [1, 0])

  return (
    <div ref={pageRef} className="space-y-8 relative">

      {/* Lens rings — concentric circles that expand as you scroll */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center" style={{ height: '400px', overflow: 'visible', zIndex: 0 }}>
        <div style={{ position: 'relative', width: 0, height: 0, top: '100px' }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '80vw', height: '80vw',
              maxWidth: 640, maxHeight: 640,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              border: '1px solid rgba(13,148,136,0.14)',
              scale: lensScale1,
              opacity: lensOpacity,
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '55vw', height: '55vw',
              maxWidth: 440, maxHeight: 440,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              border: '1px solid rgba(13,148,136,0.09)',
              scale: lensScale2,
              opacity: lensOpacity,
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '30vw', height: '30vw',
              maxWidth: 240, maxHeight: 240,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              border: '1px solid rgba(13,148,136,0.06)',
              scale: useTransform(pageScroll, [0, 0.5], [1, 1.3]),
              opacity: lensOpacity,
            }}
          />
        </div>
      </div>

      <header className="fade-up fade-up-1" style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3" style={{ letterSpacing: "-0.02em", lineHeight: "1" }}>Photography</h1>
            <p className="text-[var(--text-sec)] text-sm">frames i've kept — weddings, events, street, everyday moments</p>
          </div>
          <a
            href="https://www.instagram.com/kimiflickr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-150 hover:-translate-y-0.5 shrink-0 mt-1 group"
            style={{ background: 'rgba(var(--bg-rgb),0.6)', backdropFilter: 'blur(8px)' }}
          >
            <img src="/insta.svg.png" alt="Instagram" className="w-4 h-4 object-contain" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            <span className="text-xs text-[var(--text-sec)] group-hover:text-[var(--text-pri)] transition-colors duration-150">@kimiflickr</span>
            <span className="text-xs text-[var(--border-hover)] group-hover:text-[var(--text-sec)] transition-colors duration-150">→</span>
          </a>
        </div>
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

      {/* Film strip header */}
      <div className="fade-up fade-up-3 flex gap-1 overflow-hidden rounded-lg" style={{ height: '6px' }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-sm"
            style={{
              width: i % 5 === 0 ? '4px' : '16px',
              background: i % 5 === 0 ? 'var(--bg)' : `rgba(225,217,188,${0.1 + (i % 3) * 0.05})`,
            }}
          />
        ))}
      </div>

      {/* Category filter */}
      <div className="fade-up fade-up-4 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="text-[10px] px-3 py-1.5 rounded-full border capitalize transition-all duration-150"
            style={activeCategory === cat ? {
              background: 'rgba(240,240,219,0.1)',
              borderColor: 'rgba(240,240,219,0.25)',
              color: 'var(--accent)',
            } : {
              background: 'rgba(var(--bg-rgb),0.3)',
              borderColor: 'var(--border)',
              color: 'var(--muted)',
            }}
          >
            {cat} {cat !== 'all' && `(${photos.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div className="fade-up fade-up-5 grid grid-cols-2 gap-2">
        {filtered.map((photo, i) => (
          <motion.button
            key={photo.id}
            onClick={() => setLightbox(photo)}
            className="relative group overflow-hidden rounded-xl focus:outline-none"
            initial={{ opacity: 0, scale: 0.82, y: i % 2 === 0 ? 40 : 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.12 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full object-cover aspect-[4/3] transition-all duration-300 group-hover:scale-105"
              style={{ opacity: 0.82 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3' }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(to top, rgba(var(--bg-rgb),0.85) 0%, transparent 60%)' }}
            >
              <p className="text-[10px] text-[var(--accent)] font-medium">{photo.alt}</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[9px] text-[var(--text-sec)] capitalize">{photo.category}</span>
                {photo.location && <span className="text-[9px] text-[var(--muted)]">📍 {photo.location}</span>}
              </div>
            </div>
            {/* Expand icon */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(var(--bg-rgb),0.8)', border: '1px solid rgba(240,240,219,0.2)' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Gear section */}
      <section className="fade-up fade-up-6 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2"><span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>behind the lens</h2>
        <div className="grid grid-cols-2 gap-2">
          {gear.map(({ name, role, icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3 transition-colors duration-150 hover:border-[var(--border-hover)]"
              style={{ background: 'rgba(var(--bg-rgb),0.4)' }}
            >
              <span className="text-lg shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-medium text-[var(--text-pri)]">{name}</p>
                <p className="text-[10px] text-[var(--muted)]">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="fade-up fade-up-7 text-[10px] text-[var(--border)]">
        real portfolio photos coming soon · follow @kimiflickr for the full work
      </p>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(15,15,20,0.92)', backdropFilter: 'blur(16px)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full rounded-2xl object-cover"
              style={{ maxHeight: '75vh' }}
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl p-4"
              style={{ background: 'linear-gradient(to top, rgba(var(--bg-rgb),0.9), transparent)' }}
            >
              <p className="text-sm font-medium text-[var(--accent)]">{lightbox.alt}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-[var(--text-sec)] capitalize">{lightbox.category}</span>
                {lightbox.location && <span className="text-[10px] text-[var(--muted)]">📍 {lightbox.location}</span>}
              </div>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--accent)] transition-colors duration-150"
              style={{ background: 'rgba(var(--bg-rgb),0.8)', border: '1px solid rgba(172,186,196,0.2)' }}
            >
              ✕
            </button>
          </div>
          <p className="absolute bottom-6 text-[10px] text-[var(--border-hover)]">click outside to close</p>
        </div>
      )}
    </div>
  )
}
