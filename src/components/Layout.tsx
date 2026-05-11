import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Container from './Container'

interface LayoutProps {
  children: ReactNode
}

// ── Gradient mesh blobs ──────────────────────────────────────────────────────
function GradientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div style={{
        position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,240,219,0.06) 0%, transparent 70%)',
        top: '5%', left: '15%',
        animation: 'blobMove1 14s ease-in-out infinite',
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(172,186,196,0.05) 0%, transparent 70%)',
        top: '40%', right: '10%',
        animation: 'blobMove2 18s ease-in-out infinite',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,217,188,0.04) 0%, transparent 70%)',
        bottom: '10%', left: '25%',
        animation: 'blobMove3 22s ease-in-out infinite',
        filter: 'blur(70px)',
      }} />
      <div style={{
        position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,240,219,0.04) 0%, transparent 70%)',
        top: '60%', left: '5%',
        animation: 'blobMove2 26s ease-in-out infinite reverse',
        filter: 'blur(55px)',
      }} />
    </div>
  )
}

// ── Noise / film grain overlay ────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }}
    />
  )
}

// ── Cursor glow ───────────────────────────────────────────────────────────────
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(240,240,219,0.06) 0%, transparent 70%)',
      }}
    />
  )
}

// ── Cursor trail (canvas) ─────────────────────────────────────────────────────
function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const trail: Array<{ x: number; y: number; age: number }> = []
    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (trail.length > 18) trail.shift()
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 0.04
        if (trail[i].age >= 1) { trail.splice(i, 1); continue }
        const alpha = (1 - trail[i].age) * 0.45
        const size = (1 - trail[i].age) * 3.5
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,240,219,${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" />
}

// ── Dot grid ──────────────────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-20"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(172,186,196,0.2) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />
  )
}

// ── Top ticker ────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Available for Workforce AI roles',
  'Freelance Full-Stack Dev · open to projects',
  'Based in Jitra, Kedah · Malaysia',
  'React · TypeScript · Node.js · Supabase · Firebase',
  'Prompt Engineering · AI-assisted workflows',
  'Photographer since 2018',
  'Founder of Blugrafix',
  'Interning @ The Access Group APAC',
  'Arsenal FC 🔴',
  'Mercedes AMG F1 🏎️',
  'CGPA 3.76',
  'npm run dev',
  'git push origin main',
]

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 overflow-hidden flex items-center"
      style={{
        height: '28px',
        background: 'rgba(var(--bg-rgb), 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(var(--border-rgb), 0.2)',
      }}
    >
      <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeLeft 35s linear infinite', alignItems: 'center' }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: 'monospace', color: 'var(--muted)' }} className="text-[10px] px-5 whitespace-nowrap">
            {item}
            <span className="text-[#505870] mx-3" style={{ fontFamily: 'monospace' }}>//</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Side decorations ──────────────────────────────────────────────────────────
const leftSymbols = [
  { left: '2.5%',  delay: '0s',    duration: '3.0s', size: '1.1rem', opacity: 0.55, symbol: '</>'  },
  { left: '6%',    delay: '1.3s',  duration: '4.2s', size: '0.95rem', opacity: 0.4, symbol: '{ }'  },
  { left: '9.5%',  delay: '2.7s',  duration: '2.6s', size: '1.0rem', opacity: 0.5,  symbol: '=>'   },
  { left: '1%',    delay: '4.1s',  duration: '3.6s', size: '0.9rem', opacity: 0.35, symbol: 'fn'   },
  { left: '7%',    delay: '0.6s',  duration: '5.0s', size: '0.95rem', opacity: 0.3, symbol: '[ ]'  },
]

const leftCodeLines = [
  { left: '11%',  delay: '0s',    duration: '16s', text: 'npm run dev',           opacity: 0.22 },
  { left: '14%',  delay: '5s',    duration: '20s', text: 'git push origin main',  opacity: 0.18 },
  { left: '17%',  delay: '10s',   duration: '14s', text: '✓ built in 603ms',      opacity: 0.20 },
  { left: '12%',  delay: '3s',    duration: '22s', text: 'const ui = new Kimi()', opacity: 0.15 },
  { left: '15%',  delay: '8s',    duration: '18s', text: 'yarn dev --host',       opacity: 0.17 },
  { left: '13%',  delay: '14s',   duration: '13s', text: '{ role: "intern" }',    opacity: 0.20 },
  { left: '16%',  delay: '17s',   duration: '19s', text: 'import React from…',    opacity: 0.14 },
]

const rightSymbols = [
  { right: '2%',   delay: '0.4s',  duration: '3.4s', symbol: '>_',  size: '1.0rem', opacity: 0.55, anim: 'launchUp'   },
  { right: '6%',   delay: '1.8s',  duration: '4.8s', symbol: '#!',  size: '0.9rem', opacity: 0.4,  anim: 'launchUp'   },
  { right: '10%',  delay: '3.2s',  duration: '2.9s', symbol: '//',  size: '1.0rem', opacity: 0.5,  anim: 'launchUp'   },
  { right: '4%',   delay: '5.5s',  duration: '3.8s', symbol: 'λ',   size: '1.1rem', opacity: 0.35, anim: 'launchUp'   },
  { right: '8%',   delay: '2.5s',  duration: '6.0s', symbol: '✦',   size: '1.0rem', opacity: 0.4,  anim: 'floatDrift' },
  { right: '3.5%', delay: '1.0s',  duration: '5.5s', symbol: '∞',   size: '1.1rem', opacity: 0.3,  anim: 'floatDrift' },
  { right: '11%',  delay: '4.0s',  duration: '7.0s', symbol: '✦',   size: '0.9rem', opacity: 0.25, anim: 'floatDrift' },
]

const rightDesignTokens = [
  { right: '11%',  delay: '2s',    duration: '17s', text: '#38bdf8',              opacity: 0.22 },
  { right: '14%',  delay: '7s',    duration: '21s', text: 'border-radius: 12px',  opacity: 0.18 },
  { right: '17%',  delay: '1s',    duration: '15s', text: 'font-weight: 600',      opacity: 0.20 },
  { right: '12%',  delay: '12s',   duration: '19s', text: 'opacity: 0.85',         opacity: 0.15 },
  { right: '15%',  delay: '6s',    duration: '24s', text: 'blur(20px)',            opacity: 0.17 },
  { right: '13%',  delay: '16s',   duration: '14s', text: 'var(--accent)',         opacity: 0.20 },
  { right: '16%',  delay: '9s',    duration: '20s', text: 'grid-cols: 3',          opacity: 0.14 },
]

function SideDecorations() {
  return (
    <div className="pointer-events-none select-none hidden lg:block">
      {leftSymbols.map((sym, i) => (
        <span key={`sym-${i}`} className="fixed top-0 z-0" style={{
          left: sym.left, fontSize: sym.size, opacity: sym.opacity,
          fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 600,
          animation: `raceDown ${sym.duration} linear infinite`,
          animationDelay: sym.delay,
        }}>{sym.symbol}</span>
      ))}
      {leftCodeLines.map((line, i) => (
        <span key={`code-${i}`} className="fixed top-0 z-0" style={{
          left: line.left, opacity: line.opacity, fontSize: '10px',
          fontFamily: 'monospace', color: 'var(--accent)', whiteSpace: 'nowrap',
          animation: `driftDown ${line.duration} linear infinite`,
          animationDelay: line.delay,
          writingMode: 'vertical-rl', textOrientation: 'mixed',
        }}>{line.text}</span>
      ))}
      {rightSymbols.map((sym, i) => (
        <span key={`rsym-${i}`} className="fixed top-0 z-0" style={{
          right: sym.right, fontSize: sym.size, opacity: sym.opacity,
          fontFamily: 'monospace', color: 'var(--text-sec)', fontWeight: 600,
          animation: `${sym.anim} ${sym.duration} linear infinite`,
          animationDelay: sym.delay,
        }}>{sym.symbol}</span>
      ))}
      {rightDesignTokens.map((token, i) => (
        <span key={`token-${i}`} className="fixed top-0 z-0" style={{
          right: token.right, opacity: token.opacity, fontSize: '10px',
          fontFamily: 'monospace', color: 'var(--text-sec)', whiteSpace: 'nowrap',
          animation: `driftDown ${token.duration} linear infinite`,
          animationDelay: token.delay,
          writingMode: 'vertical-rl', textOrientation: 'mixed',
        }}>{token.text}</span>
      ))}
    </div>
  )
}

// ── Easter egg (canvas confetti) ──────────────────────────────────────────────
function EasterEgg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const bufferRef = useRef('')
  const activeRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const trigger = (isArsenal: boolean) => {
      if (activeRef.current) return
      activeRef.current = true
      const msg = isArsenal ? '⚽ COYG! Come On You Gunners! 🔴' : "👋 hey, that's me!"
      setMessage(msg)

      const colors = isArsenal
        ? ['#ef4444', '#ffffff', '#dc2626', '#fef2f2', '#f97316']
        : ['#38bdf8', '#a78bfa', '#f9a8d4', '#ffffff', '#34d399']

      const particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 5,
        vy: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        isCircle: Math.random() > 0.4,
      }))

      const startTime = performance.now()
      const duration = 3500
      let raf: number

      const animate = (now: number) => {
        const elapsed = now - startTime
        if (elapsed > duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          activeRef.current = false
          setMessage(null)
          bufferRef.current = ''
          return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const globalAlpha = Math.max(0, 1 - (elapsed - duration * 0.6) / (duration * 0.4))
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rotation += p.rotSpeed
          ctx.save()
          ctx.globalAlpha = Math.min(1, globalAlpha)
          ctx.fillStyle = p.color
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          if (p.isCircle) {
            ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill()
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
          }
          ctx.restore()
        })
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
      setTimeout(() => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); activeRef.current = false; setMessage(null); bufferRef.current = '' }, duration + 200)
    }

    const onKey = (e: KeyboardEvent) => {
      bufferRef.current = (bufferRef.current + e.key).slice(-8).toLowerCase()
      if (bufferRef.current.includes('arsenal')) trigger(true)
      else if (bufferRef.current.includes('kimi')) trigger(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90]" />
      {message && (
        <div className="pointer-events-none fixed inset-0 z-[91] flex items-center justify-center">
          <div style={{
            background: 'rgba(var(--bg-rgb), 0.92)',
            border: '1px solid rgba(var(--border-rgb), 0.4)',
            backdropFilter: 'blur(20px)',
            padding: '18px 36px',
            borderRadius: '16px',
            animation: 'fadeUp 0.3s ease forwards',
          }}>
            <p className="text-xl font-semibold text-[#e1d9bc] text-center">{message}</p>
            <p className="text-xs text-[#606880] text-center mt-1">you found an easter egg 🥚</p>
          </div>
        </div>
      )}
    </>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-pri)' }}>
      <DotGrid />
      <GradientMesh />
      <NoiseOverlay />
      <CursorGlow />
      <CursorTrail />
      <SideDecorations />
      <Ticker />
      <EasterEgg />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Container>{children}</Container>
          </motion.div>
        </AnimatePresence>
      </div>

      <Navbar />
    </div>
  )
}
