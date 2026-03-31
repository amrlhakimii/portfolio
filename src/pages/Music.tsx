import { useState, useEffect, useRef } from 'react'

interface Album {
  title: string
  artist: string
  year: string
  genre: string
  note: string
  cover: string
}

const albums: Album[] = [
  {
    artist: 'Menari dengan Bayangan',
    title: 'Hindia',
    year: '2022',
    genre: 'indie pop',
    note: 'When everything feels heavy but you still want to move forward.',
    cover: '/hindia.jpg',
  },
  {
    artist: 'The Black Parade',
    title: 'My Chemical Romance',
    year: '2006',
    genre: 'emo / rock',
    note: 'Dramatic, loud, cathartic. Teenage energy that never expired.',
    cover: '/mcr.jpg',
  },
  {
    artist: 'Views',
    title: 'Drake',
    year: '2021',
    genre: 'hip-hop / r&b',
    note: 'Late nights, driving alone, thinking too much.',
    cover: '/drake.jpg',
  },
  {
    artist: 'Superpowers',
    title: 'Daniel Caesar',
    year: '2020',
    genre: 'indie / folk',
    note: 'Quiet and introspective. Good for writing and long sessions.',
    cover: '/daniel.jpeg',
  },
  {
    artist: 'AM',
    title: 'Arctic Monkeys',
    year: '2006',
    genre: 'indie rock',
    note: 'Every track hits. Never skipping this one.',
    cover: '/arctic.png',
  },
  {
    artist: 'Memorandum',
    title: 'Perunggu',
    year: '2019',
    genre: 'indie / lofi',
    note: 'Local favourite. Mellow, warm, and uniquely Malaysian.',
    cover: '/perunggu.jpg',
  },
]

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

function VinylRecord({ album, isPlaying, isSelected, onClick }: {
  album: Album
  isPlaying: boolean
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-3 group focus:outline-none"
    >
      {/* Vinyl disc */}
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 transition-all duration-300"
        style={{
          boxShadow: isSelected
            ? '0 0 0 3px var(--accent), 0 8px 32px rgba(0,0,0,0.6)'
            : '0 4px 20px rgba(0,0,0,0.5)',
          animation: isPlaying ? 'vinylSpin 4s linear infinite' : 'none',
        }}
      >
        {/* Dark vinyl base */}
        <div className="absolute inset-0 rounded-full bg-[#111]" />
        {/* Album cover clipped to circle */}
        <img
          src={album.cover}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          style={{ opacity: 0.85 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
        />
        <VinylGrooves />
      </div>

      {/* Label under vinyl */}
      <div className="text-center space-y-0.5 max-w-[112px]">
        <p className="text-[11px] font-medium text-[var(--text-pri)] leading-tight line-clamp-1 group-hover:text-[var(--accent)] transition-colors duration-150">
          {album.artist}
        </p>
        <p className="text-[9px] text-[var(--text-sec)] line-clamp-1">{album.title}</p>
      </div>
    </button>
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

  return (
    <div className="space-y-8">
      <header className="fade-up fade-up-1">
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Music</h1>
        <p className="text-[var(--text-sec)] text-sm">what i keep on repeat — click a record to play</p>
      </header>

      {/* Cassette + player */}
      <section className="fade-up fade-up-2">
        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--border)]"
          style={{ background: 'rgba(28,24,18,0.95)' }}
        >
          {/* Cassette background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
            <img src="/cassette.png" alt="" className="w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          </div>

          {/* Retro top bar */}
          <div
            className="relative z-10 flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: 'rgba(225,217,188,0.08)', background: 'rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] tracking-widest uppercase" style={{ color: '#a09070', fontFamily: 'monospace' }}>
                KIMI — TAPE DECK
              </span>
            </div>
            <span className="text-[10px]" style={{ color: '#a09070', fontFamily: 'monospace' }}>{elapsed}</span>
          </div>

          {/* Main player */}
          <div className="relative z-10 p-6 flex flex-col gap-6">

            {/* Album cover (large spinning vinyl) */}
            <div className="flex items-center gap-6">
              <div
                className="relative w-36 h-36 rounded-full shrink-0 overflow-hidden"
                style={{
                  boxShadow: playing
                    ? '0 0 0 3px var(--accent), 0 0 40px rgba(240,240,219,0.15), 0 8px 32px rgba(0,0,0,0.8)'
                    : '0 8px 32px rgba(0,0,0,0.8)',
                  animation: playing ? 'vinylSpin 4s linear infinite' : 'none',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <div className="absolute inset-0 bg-[#111] rounded-full" />
                <img
                  src={current.cover}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  style={{ opacity: 0.9 }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
                />
                <VinylGrooves />
              </div>

              {/* Track info */}
              <div className="flex-1 space-y-2 min-w-0">
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#a09070', fontFamily: 'monospace' }}>
                    now {playing ? 'playing' : 'cued'}
                  </p>
                  <p className="text-lg font-semibold leading-tight text-[var(--accent)] truncate">{current.artist}</p>
                  <p className="text-sm text-[var(--text-sec)] truncate">{current.title} · {current.year}</p>
                </div>
                <p className="text-xs text-[#7a8070] leading-relaxed italic">"{current.note}"</p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ color: '#a09070', borderColor: 'rgba(160,144,112,0.3)', background: 'rgba(160,144,112,0.08)' }}
                  >
                    {current.genre}
                  </span>
                  <span className="text-[9px] text-[#505870]">{current.year}</span>
                </div>
              </div>
            </div>

            {/* Sound wave + controls */}
            <div className="flex items-center gap-4">
              <SoundWave playing={playing} />

              <div className="flex items-center gap-3 ml-auto">
                {/* Prev */}
                <button
                  onClick={() => { setSelected(i => (i - 1 + albums.length) % albums.length); setPlaying(true) }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
                  style={{ background: 'rgba(225,217,188,0.08)', border: '1px solid rgba(225,217,188,0.1)', color: 'var(--text-sec)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
                  </svg>
                </button>

                {/* Play/pause */}
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
                  style={{
                    background: playing ? 'var(--text-pri)' : 'rgba(225,217,188,0.12)',
                    border: '1px solid rgba(225,217,188,0.2)',
                    color: playing ? 'var(--bg)' : 'var(--text-pri)',
                    boxShadow: playing ? '0 0 20px rgba(240,240,219,0.2)' : 'none',
                  }}
                >
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={() => { setSelected(i => (i + 1) % albums.length); setPlaying(true) }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
                  style={{ background: 'rgba(225,217,188,0.08)', border: '1px solid rgba(225,217,188,0.1)', color: 'var(--text-sec)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Track list */}
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: 'rgba(225,217,188,0.08)', background: 'rgba(0,0,0,0.25)' }}
            >
              <p className="text-[9px] uppercase tracking-widest px-4 py-2 border-b" style={{ color: '#605840', borderColor: 'rgba(225,217,188,0.06)', fontFamily: 'monospace' }}>
                — SIDE A —
              </p>
              {albums.map((album, i) => (
                <button
                  key={album.title}
                  onClick={() => handleSelect(i)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 hover:bg-white/[0.03]"
                  style={{ borderBottom: i < albums.length - 1 ? '1px solid rgba(225,217,188,0.04)' : 'none' }}
                >
                  <span
                    className="text-[10px] w-5 shrink-0"
                    style={{ color: selected === i && playing ? 'var(--accent)' : 'var(--border-hover)', fontFamily: 'monospace' }}
                  >
                    {selected === i && playing ? '▶' : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="text-xs block truncate" style={{ color: selected === i ? 'var(--text-pri)' : '#7a8070' }}>
                      {album.artist}
                    </span>
                    <span className="text-[10px] block truncate" style={{ color: selected === i ? 'var(--text-sec)' : 'var(--border-hover)' }}>
                      {album.title}
                    </span>
                  </span>
                  <span className="text-[9px] shrink-0" style={{ color: 'var(--border-hover)', fontFamily: 'monospace' }}>
                    {album.genre}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vinyl shelf — all records */}
      <section className="fade-up fade-up-3 space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)]">record shelf</h2>
        <div className="flex flex-wrap gap-6 justify-start">
          {albums.map((album, i) => (
            <VinylRecord
              key={album.title}
              album={album}
              isPlaying={selected === i && playing}
              isSelected={selected === i}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
        <p className="text-[10px] text-[var(--border)]">click a record to cue · click again to play / pause</p>
      </section>
    </div>
  )
}
