import { useCallback, useEffect, useRef, useState } from 'react'

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
  { text: 'const dev = "amrl',            hold: 520 },
  { text: 'const dev = "amr',             hold: 80  },
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

function playClick(ctx: AudioContext, isErase = false) {
  try {
    const now = ctx.currentTime
    const dur = 0.04

    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(isErase ? 280 : 580, now)
    osc.frequency.exponentialRampToValueAtTime(isErase ? 80 : 180, now + dur)
    oscGain.gain.setValueAtTime(0.18, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + dur)
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + dur)

    const bufSize = Math.floor(ctx.sampleRate * dur)
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.12, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.5)
    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
  } catch { /* ignore */ }
}

const FADE_MS = 500

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [started, setStarted] = useState(false)
  const [text, setText] = useState('')
  const [fading, setFading] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Start on any user interaction — this is the required gesture to unlock audio
  const handleStart = useCallback(() => {
    if (started) return
    try {
      const ctx = new AudioContext()
      audioCtxRef.current = ctx
      ctx.resume().then(() => setStarted(true))
    } catch {
      setStarted(true)
    }
  }, [started])

  useEffect(() => {
    window.addEventListener('keydown', handleStart)
    window.addEventListener('click', handleStart)
    return () => {
      window.removeEventListener('keydown', handleStart)
      window.removeEventListener('click', handleStart)
    }
  }, [handleStart])

  // Run frames once started
  useEffect(() => {
    if (!started) return
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
      const ctx = audioCtxRef.current
      if (ctx && frame.text !== prevText) {
        playClick(ctx, frame.text.length < prevText.length)
      }
      prevText = frame.text
      setText(frame.text)
      t = setTimeout(next, frame.hold)
    }

    t = setTimeout(next, 80)
    return () => {
      clearTimeout(t)
      audioCtxRef.current?.close()
    }
  }, [started, onDone])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: '#0d1117',
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fading ? 'none' : 'auto',
        cursor: 'pointer',
      }}
      onClick={handleStart}
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

      <div
        className="relative z-10 select-none flex flex-col items-center gap-3"
        style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Courier New', monospace" }}
      >
        {!started ? (
          /* Idle — waiting for interaction */
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span style={{ color: '#3a4060', fontSize: 'clamp(0.85rem, 3.5vw, 1.45rem)' }}>{'>'}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: 'clamp(1rem, 3.5vw, 1.4rem)',
                  background: '#acbac4',
                  animation: 'cursor-blink 0.75s step-end infinite',
                  verticalAlign: 'middle',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 'clamp(0.55rem, 1.8vw, 0.7rem)',
                color: '#2a3050',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              press any key
            </span>
          </div>
        ) : (
          /* Typing */
          <>
            <div className="relative flex items-center gap-6">
              <div
                className="absolute"
                style={{
                  inset: '-10px -20px',
                  background: 'rgba(130,170,255,0.04)',
                  borderRadius: '6px',
                  border: '1px solid rgba(130,170,255,0.06)',
                }}
              />
              <span
                className="relative shrink-0 tabular-nums"
                style={{ color: '#2a3050', fontSize: 'clamp(0.75rem, 2.5vw, 1rem)' }}
              >
                1
              </span>
              <span
                className="relative"
                style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.45rem)', letterSpacing: '0.02em' }}
              >
                <Highlighted text={text} />
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
            <span
              style={{
                fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
                color: '#2a3050',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              personal portfolio
            </span>
          </>
        )}
      </div>
    </div>
  )
}
