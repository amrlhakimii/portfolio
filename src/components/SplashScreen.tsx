import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onDone: () => void
}

// Each frame: what's on screen, and how long to hold before advancing
const FRAMES: { text: string; hold: number }[] = [
  { text: 'a',           hold: 100 },
  { text: 'am',          hold: 80  },
  { text: 'amr',         hold: 80  },
  { text: 'amrl',        hold: 520 }, // hesitate — looks like a typo pause
  { text: 'amr',         hold: 80  }, // erase the l
  { text: 'amrl',        hold: 80  },
  { text: 'amrlh',       hold: 80  },
  { text: 'amrlha',      hold: 80  },
  { text: 'amrlhak',     hold: 80  },
  { text: 'amrlhaki',    hold: 80  },
  { text: 'amrlhakim',   hold: 80  },
  { text: 'amrlhakimi',  hold: 80  },
  { text: 'amrlhakimii', hold: 1000 }, // hold on the full name
]

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

    t = setTimeout(next, 400) // brief pause before typing starts
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: '#1c2035',
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Dot grid — matches the site */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(172,186,196,0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Typewriter text + cursor */}
      <div className="relative z-10 flex items-center select-none" style={{ fontFamily: 'monospace' }}>
        <span
          style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.6rem)',
            fontWeight: 500,
            color: '#e1d9bc',
            letterSpacing: '0.04em',
          }}
        >
          {text}
        </span>
        {/* Blinking cursor */}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: 'clamp(1.4rem, 5vw, 2.2rem)',
            background: '#acbac4',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'cursor-blink 0.75s step-end infinite',
          }}
        />
      </div>
    </div>
  )
}
