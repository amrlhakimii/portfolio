import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/about',       label: '',       emoji: '👋' },
  { to: '/thoughts',    label: '',    emoji: '💭' },
  { to: '/til',         label: '',         emoji: '💡' },
  { to: '/projects',    label: '',    emoji: '🛠️' },
  { to: '/photography', label: '', emoji: '📷' },
  { to: '/bookmarks',   label: '',   emoji: '🔖' },
  { to: '/music',       label: '',       emoji: '🎵' },
  { to: '/uses',        label: '',        emoji: '⚙️' },
  { to: '/friends',     label: '',     emoji: '🤝' },
  { to: '/profile',     label: '',     emoji: '🪪' },
  { to: '/career',      label: '',      emoji: '📋' },
]

function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="text-xs tabular-nums" style={{ color: 'var(--text-sec)' }}>
      {time.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
      style={{
        background: 'rgba(var(--border-rgb), 0.5)',
        border: '1px solid rgba(var(--border-rgb), 0.8)',
        color: 'var(--text-sec)',
      }}
    >
      {theme === 'dark' ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const { theme } = useTheme()
  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <nav
        className="w-full max-w-[720px] rounded-2xl overflow-hidden pointer-events-auto"
        style={{
          background: theme === 'dark' ? 'rgba(48, 54, 79, 0.82)' : 'rgba(240, 235, 224, 0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: theme === 'dark'
            ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 8px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
          transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Top row: name + clock + theme toggle + socials */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}
        >
          <NavLink to="/about" style={{ perspective: '600px', display: 'inline-block', filter: 'var(--logo-filter)' }}>
            <img
              src="/logo.png"
              alt="amrlhakimii"
              style={{
                width: '28px',
                height: '28px',
                objectFit: 'contain',
                animation: 'coin-spin 3s linear infinite',
              }}
            />
          </NavLink>

          <div className="flex items-center gap-3">
            <LiveClock />
            <ThemeToggle />

            <a href="https://github.com/amrlhakimii" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="transition-colors duration-150" style={{ color: 'var(--text-sec)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/amrlhakimii/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="transition-colors duration-150" style={{ color: 'var(--text-sec)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom row: emoji nav */}
        <div className="flex items-center justify-between px-2 py-1.5">
          {links.map(({ to, emoji }) => (
            <NavLink
              key={to}
              to={to}
              title={to.replace('/', '')}
              className={({ isActive }) =>
                `flex items-center justify-center w-8 h-8 rounded-lg text-base transition-all duration-150 ${
                  isActive ? 'scale-110' : ''
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(var(--border-rgb), 0.4)',
                color: 'var(--accent)',
              } : {
                color: 'var(--text-sec)',
              }}
            >
              {emoji}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
