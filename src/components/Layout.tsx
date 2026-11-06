import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Container from './Container'

interface LayoutProps {
  children: ReactNode
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
      const msg = isArsenal ? 'COYG, Come On You Gunners' : "Hey, that's me"
      setMessage(msg)

      const colors = isArsenal
        ? ['#ef0107', '#ffffff', '#d2b06a', '#063672']
        : ['#f0f0db', '#e1d9bc', '#acbac4', '#98a1b6']

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
                        padding: '18px 36px',
            borderRadius: '16px',
                      }}>
            <p className="text-xl font-semibold text-[var(--text-pri)] text-center">{message}</p>
            <p className="text-xs text-[var(--muted)] text-center mt-1">You found an easter egg</p>
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
      <EasterEgg />
      <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ background: 'var(--accent-fill)' }} aria-hidden="true" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <Container>{children}</Container>
          </motion.div>
        </AnimatePresence>
      </div>

      <Navbar />
    </div>
  )
}
