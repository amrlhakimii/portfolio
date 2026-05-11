import { useEffect } from 'react'

interface SplashScreenProps {
  onDone: () => void
}

const T = {
  welcomeDelay:   0.15,
  toDelay:        0.72,
  nameDelay:      1.30,
  slideDuration:  0.68,
  jiggleDelay:    2.30,
  jiggleDuration: 0.65,
  fadeDelay:      3.20,
  fadeDuration:   0.55,
  doneMs:         3850,
}

const SPRING = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, T.doneMs)
    return () => clearTimeout(timer)
  }, [onDone])

  const slideAnim = (dir: 'left' | 'right' | 'bottom', delay: number): React.CSSProperties => ({
    animation: `splash-from-${dir} ${T.slideDuration}s ${SPRING} ${delay}s both`,
  })

  const jiggleAnim = (extraDelay = 0): React.CSSProperties => ({
    display: 'block',
    animation: `splash-jiggle ${T.jiggleDuration}s ease-in-out ${T.jiggleDelay + extraDelay}s`,
  })

  const fadeOut: React.CSSProperties = {
    animation: `splash-out ${T.fadeDuration}s ease ${T.fadeDelay}s forwards`,
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ ...fadeOut, background: '#1c2035' }}
    >
      {/* Dot grid — matches the site's DotGrid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(172,186,196,0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          animation: 'splash-glow 2.5s ease-in-out infinite',
          filter: 'blur(80px)',
        }}
      />

      {/* Text */}
      <div className="relative z-10 flex flex-col items-center gap-1 select-none">
        {/* WELCOME */}
        <span style={jiggleAnim(0)}>
          <span
            className="block font-bold uppercase leading-none"
            style={{
              ...slideAnim('left', T.welcomeDelay),
              fontFamily: "'Glacial Indifference', system-ui, sans-serif",
              fontSize: 'clamp(2.2rem, 11vw, 3.8rem)',
              letterSpacing: '0.14em',
              color: '#e1d9bc',
            }}
          >
            WELCOME
          </span>
        </span>

        {/* TO */}
        <span style={jiggleAnim(0.04)}>
          <span
            className="block font-bold uppercase leading-none"
            style={{
              ...slideAnim('right', T.toDelay),
              fontFamily: "'Glacial Indifference', system-ui, sans-serif",
              fontSize: 'clamp(1.4rem, 7vw, 2.4rem)',
              letterSpacing: '0.55em',
              paddingLeft: '0.55em',
              color: '#4a5278',
            }}
          >
            TO
          </span>
        </span>

        {/* AMRLHAKIMI */}
        <span style={jiggleAnim(0.08)}>
          <span
            className="block font-bold uppercase leading-none mt-1"
            style={{
              ...slideAnim('bottom', T.nameDelay),
              fontFamily: "'Glacial Indifference', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 10vw, 3.2rem)',
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: '#e1d9bc' }}>AMRL</span>
            <span style={{
              background: 'linear-gradient(270deg, #f9a8d4 0%, #d8b4fe 40%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>HAKIMI</span>
          </span>
        </span>
      </div>
    </div>
  )
}
