import { useState, useEffect } from 'react'

interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumArt?: string
  songUrl?: string
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null)

  useEffect(() => {
    let cancelled = false
    async function poll() {
      try {
        const res = await fetch('/api/now-playing')
        if (!res.ok) return
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch {
        // silently keep last known state — Spotify hiccups shouldn't break the page
      }
    }
    poll()
    const id = setInterval(poll, 30000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  const title = data?.title ?? 'Mardy Bum'
  const artist = data?.artist ?? 'Arctic Monkeys'
  const album = data?.album ?? "Whatever People Say, That's What I'm Not"
  const albumArt = data?.albumArt ?? '/am.jpg'
  const songUrl = data?.songUrl
  const isPlaying = data?.isPlaying ?? false

  const content = (
    <div
      className="flex items-center gap-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-4 transition-colors duration-150"
      style={{ background: 'rgba(var(--bg-rgb),0.6)' }}
    >
      {/* Album art */}
      <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <img src={albumArt} alt="Album art" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
        {isPlaying && (
          <div className="absolute inset-0 rounded-lg border border-[var(--accent)]/30" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-0.5">
          {isPlaying ? 'currently listening' : 'last played'}
        </p>
        <p className="text-sm font-medium text-[var(--text-pri)] truncate">{title}</p>
        <p className="text-xs text-[var(--text-sec)] truncate">{artist} · {album}</p>
      </div>
      {/* Sound bars */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-5 shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-[var(--accent)]"
              style={{
                animation: `soundBar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.1}s`,
                height: '4px',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )

  return songUrl ? (
    <a href={songUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : content
}
