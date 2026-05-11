import { useEffect, useRef, useState } from 'react'

interface SplashScreenProps {
  onDone: () => void
}

const FRAMES: { text: string; hold: number }[] = [
  { text: 'c',                             hold: 80  },
  { text: 'co',                            hold: 60  },
  { text: 'con',                           hold: 60  },
  { text: 'cons',                          hold: 60  },
  { text: 'const',                         hold: 80  },
  { text: 'const ',                        hold: 60  },
  { text: 'const d',                       hold: 80  },
  { text: 'const de',                      hold: 60  },
  { text: 'const dev',                     hold: 80  },
  { text: 'const dev ',                    hold: 60  },
  { text: 'const dev =',                   hold: 80  },
  { text: 'const dev = ',                  hold: 60  },
  { text: 'const dev = "',                 hold: 80  },
  { text: 'const dev = "a',               hold: 60  },
  { text: 'const dev = "am',              hold: 60  },
  { text: 'const dev = "amr',             hold: 60  },
  { text: 'const dev = "amrl',            hold: 520 }, // hesitate — looks like a typo
  { text: 'const dev = "amr',             hold: 80  }, // erase the l
  { text: 'const dev = "amrl',            hold: 60  },
  { text: 'const dev = "amrlh',           hold: 60  },
  { text: 'const dev = "amrlha',          hold: 60  },
  { text: 'const dev = "amrlhak',         hold: 60  },
  { text: 'const dev = "amrlhaki',        hold: 60  },
  { text: 'const dev = "amrlhakim',       hold: 60  },
  { text: 'const dev = "amrlhakimi',      hold: 60  },
  { text: 'const dev = "amrlhakimii',     hold: 100 },
  { text: 'const dev = "amrlhakimii"',    hold: 120 },
  { text: 'const dev = "amrlhakimii";',   hold: 1000 },
]

// Color per character index in the final string "const dev = "amrlhakimii";"
// 0-4   : const   → purple
// 5     : (space) → muted
// 6-8   : dev     → blue
// 9,11  : spaces  → muted
// 10    : =       → cyan
// 12+   : "..."   → green (handled below)
const CHAR_COLOR: Record<number, string> = {
  0: '#c792ea', 1: '#c792ea', 2: '#c792ea', 3: '#c792ea', 4: '#c792ea',
  5: '#3a4060',
  6: '#82aaff', 7: '#82aaff', 8: '#82aaff',
  9: '#3a4060', 10: '#89ddff', 11: '#3a4060',
}

function Highlighted({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} style={{ color: i >= 12 ? '#c3e88d' : (CHAR_COLOR[i] ?? '#e1d9bc') }}>
          {char}
        </span>
      ))}
    </>
  )
}

const FADE_MS = 500

function playClick(ctx: AudioContext, isErase = false) {
  try {
    const now = ctx.currentTime
    const bufferSize = Math.floor(ctx.sampleRate * 0.025)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = isErase ? 1200 : 3500
    filter.Q.value = 0.6

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(isErase ? 0.04 : 0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
  } catch {
    // silently ignore — audio may be blocked
  }
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [text, setText] = useState('')
  const [fading, setFading] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    let i = 0
    let t: ReturnType<typeof setTimeout>
    let prevText = ''

    const next = () => {
      if (i >= FRAMES.length) {
        setFading(true)
        setTimeout(onDone, FADE_MS + 50)
        return
      }
      const frame = FRAMES[i++]

      // Init AudioContext on first keystroke (satisfies browser autoplay policy)
      if (!audioCtxRef.current) {
        try { audioCtxRef.current = new AudioContext() } catch { /* ignore */ }
      }
      if (audioCtxRef.current && frame.text !== prevText) {
        const isErase = frame.text.length < prevText.length
        playClick(audioCtxRef.current, isErase)
      }

      prevText = frame.text
      setText(frame.text)
      t = setTimeout(next, frame.hold)
    }

    t = setTimeout(next, 400)
    return () => {
      clearTimeout(t)
      audioCtxRef.current?.close()
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: '#0d1117',
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, rgba(172,186,196,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '600px', height: '180px',
          background: 'radial-gradient(ellipse, rgba(130,170,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Code line */}
      <div
        className="relative z-10 select-none flex flex-col items-center gap-3"
        style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Courier New', monospace" }}
      >
        {/* Active line highlight */}
        <div
          className="absolute"
          style={{
            inset: '-10px -20px',
            background: 'rgba(130,170,255,0.04)',
            borderRadius: '6px',
            border: '1px solid rgba(130,170,255,0.06)',
          }}
        />

        {/* Code row */}
        <div className="relative flex items-center gap-6">
          {/* Active line highlight */}
          <div
            className="absolute"
            style={{
              inset: '-10px -20px',
              background: 'rgba(130,170,255,0.04)',
              borderRadius: '6px',
              border: '1px solid rgba(130,170,255,0.06)',
            }}
          />

          {/* Line number */}
          <span
            className="relative shrink-0 tabular-nums"
            style={{ color: '#2a3050', fontSize: 'clamp(0.75rem, 2.5vw, 1rem)' }}
          >
            1
          </span>

          {/* Typed code */}
          <span
            className="relative"
            style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.45rem)', letterSpacing: '0.02em' }}
          >
            <Highlighted text={text} />
            {/* Blinking cursor */}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.1em',
                background: '#acbac4',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'cursor-blink 0.75s step-end infinite',
              }}
            />
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
            color: '#2a3050',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: "ui-monospace, 'Cascadia Code', 'Courier New', monospace",
          }}
        >
          personal portfolio
        </span>
      </div>
    </div>
  )
}
