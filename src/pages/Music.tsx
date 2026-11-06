import { useState, useEffect, useRef } from 'react'
import { NowPlaying } from '../components/NowPlaying'
import SectionLabel from '../components/SectionLabel'
import PageHeader from '../components/PageHeader'

interface Album {
  artist: string
  album: string
  year: string
  genre: string
  cover: string
}

const FALLBACK_ALBUMS: Album[] = [
  { artist: 'Hindia', album: 'Menari dengan Bayangan', year: '2022', genre: 'indie pop', cover: '/hindia.jpg' },
  { artist: 'My Chemical Romance', album: 'The Black Parade', year: '2006', genre: 'emo / rock', cover: '/mcr.jpg' },
  { artist: 'Drake', album: 'Views', year: '2021', genre: 'hip-hop / r&b', cover: '/drake.jpg' },
  { artist: 'Daniel Caesar', album: 'Superpowers', year: '2020', genre: 'indie / folk', cover: '/daniel.jpeg' },
  { artist: 'Arctic Monkeys', album: 'AM', year: '2006', genre: 'indie rock', cover: '/arctic.png' },
  { artist: 'Perunggu', album: 'Memorandum', year: '2019', genre: 'indie / lofi', cover: '/perunggu.jpg' },
]

function useTopAlbums() {
  const [albums, setAlbums] = useState<Album[]>(FALLBACK_ALBUMS)

  useEffect(() => {
    let cancelled = false
    fetch('/api/top-albums')
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (!cancelled && json?.albums?.length) setAlbums(json.albums)
      })
      .catch(() => {
        // keep fallback list — Spotify hiccups shouldn't break the page
      })
    return () => { cancelled = true }
  }, [])

  return albums
}

// Animated vinyl grooves (SVG rings)
function VinylGrooves() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
      {[30, 38, 46, 54, 62, 70, 78, 86].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      ))}
      {/* Label ring */}
      <circle cx="100" cy="100" r="28" fill="rgba(0,0,0,0.5)" />
      <circle cx="100" cy="100" r="5" fill="rgba(255,255,255,0.15)" />
    </svg>
  )
}

// Animated sound wave bars
function SoundWave({ playing }: { playing: boolean }) {
  const bars = [3, 5, 8, 5, 10, 7, 4, 9, 6, 3, 7, 5]
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full"
          style={{
            height: playing ? `${h * 2.5}px` : '3px',
            background: playing ? 'var(--text-pri)' : 'var(--border)',
            animation: playing ? `soundBar ${0.4 + (i % 4) * 0.15}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.05}s`,
            transition: 'height 0.3s ease, background 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

// Tick counter for elapsed time display
function useElapsed(running: boolean) {
  const [seconds, setSeconds] = useState(0)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      if (ref.current) clearInterval(ref.current)
      setSeconds(0)
    }
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [running])
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function Music() {
  const albums = useTopAlbums()
  const [selected, setSelected] = useState<number>(0)
  const [playing, setPlaying] = useState(false)
  const elapsed = useElapsed(playing)
  const current = albums[selected]

  const handleSelect = (i: number) => {
    if (selected === i) {
      setPlaying(p => !p)
    } else {
      setSelected(i)
      setPlaying(true)
    }
  }

  const ctl = 'w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-sec)] hover:text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150'

  return (
    <div className="space-y-16">
      <PageHeader title="Music" subtitle="What I keep on repeat. Select a record to play" />

      <section className="fade-up fade-up-2 grid lg:grid-cols-[22rem_1fr] gap-10 lg:gap-14 items-start">
        <div className="space-y-6">
          <div
            className="relative aspect-square w-full max-w-[22rem] mx-auto rounded-full overflow-hidden"
            style={{
              boxShadow: playing ? '0 0 0 3px var(--accent)' : '0 0 0 1px var(--border)',
              animation: playing ? 'vinylSpin 6s linear infinite' : 'none',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[#070b17]" />
            <img
              src={current.cover}
              alt={current.album}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{ opacity: 0.9 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
            />
            <VinylGrooves />
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <p className="text-xs text-[var(--muted)]" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>
              <span className="text-[var(--accent)]">//</span> Now {playing ? 'playing' : 'cued'} · {elapsed}
            </p>
            <p className="font-serif text-3xl leading-tight text-[var(--text-pri)]" style={{ letterSpacing: '-0.02em' }}>{current.artist}</p>
            <p className="text-sm text-[var(--text-sec)]">{current.album} · {current.year}</p>
            <p className="text-xs text-[var(--muted)]">{current.genre}</p>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <button
              aria-label="Previous record"
              onClick={() => { setSelected(i => (i - 1 + albums.length) % albums.length); setPlaying(true) }}
              className={ctl}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
            </button>
            <button
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={() => setPlaying(p => !p)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: 'var(--accent-fill)', color: 'var(--on-accent)' }}
            >
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button
              aria-label="Next record"
              onClick={() => { setSelected(i => (i + 1) % albums.length); setPlaying(true) }}
              className={ctl}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z"/></svg>
            </button>
            <SoundWave playing={playing} />
          </div>
        </div>

        <div className="space-y-3 min-w-0">
          <SectionLabel>Side A</SectionLabel>
          <ol className="border-b border-[var(--border)]">
            {albums.map((album, i) => {
              const active = selected === i
              return (
                <li key={album.album} className="border-t border-[var(--border)]">
                  <button
                    onClick={() => handleSelect(i)}
                    aria-label={`${active && playing ? 'Pause' : 'Play'} ${album.album} by ${album.artist}`}
                    className="w-full text-left grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_1fr_9rem_3rem] gap-3 py-4 items-center group cursor-pointer"
                  >
                    <span className="text-xs tabular-nums" style={{ color: active ? 'var(--accent)' : 'var(--muted)', fontFamily: 'ui-monospace, Consolas, monospace' }}>
                      {active && playing ? '▶' : String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-xl truncate transition-colors duration-150" style={{ color: active ? 'var(--accent)' : 'var(--text-pri)' }}>{album.artist}</span>
                      <span className="block text-xs text-[var(--text-sec)] truncate">{album.album}</span>
                    </span>
                    <span className="hidden sm:block text-xs text-[var(--muted)] truncate">{album.genre}</span>
                    <span className="text-xs tabular-nums text-[var(--muted)] text-right">{album.year}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="text-xs text-[var(--muted)]">Select a record to cue it. Select again to play or pause.</p>
        </div>
      </section>

      <section className="fade-up fade-up-3 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-10">
        <div className="md:sticky md:top-6 self-start"><SectionLabel>From my Spotify</SectionLabel></div>
        <NowPlaying />
      </section>
    </div>
  )
}
