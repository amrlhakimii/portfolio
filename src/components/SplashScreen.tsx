import { useEffect, useState } from 'react'

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

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [text, setText] = useState('')
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let i = 0
    let t: ReturnType<typeof setTimeout>

    const next = () => {
      if (i >= FRAMES.length) {
        setFading(true)
        setTimeout(onDone, FADE_MS + 50)
        return
      }
      const frame = FRAMES[i++]
      setText(frame.text)
      t = setTimeout(next, frame.hold)
    }

    t = setTimeout(next, 400)
    return () => clearTimeout(t)
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
        className="relative z-10 select-none flex items-center gap-6"
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
    </div>
  )
}
