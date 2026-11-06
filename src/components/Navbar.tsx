import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import { useTheme } from '../context/ThemeContext'

const ICONS: Record<string, JSX.Element> = {
  about: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>,
  thoughts: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  til: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>,
  projects: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />,
  photography: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  bookmarks: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  uses: <><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4" /></>,
  friends: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  profile: <><rect width="18" height="14" x="3" y="5" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h4M6 17c0-1.5 1.5-2 3-2s3 .5 3 2" /></>,
  career: <><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
}

const links = Object.keys(ICONS).map((name) => ({ to: `/${name === 'bookmarks' ? 'bookmarks' : name}`, label: name[0].toUpperCase() + name.slice(1) }))

function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="text-xs tabular-nums" style={{ color: 'var(--text-sec)' }}>
      {time.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-150 hover:text-[var(--text-pri)]"
      style={{
        background: 'rgba(var(--border-rgb), 0.5)',
        border: '1px solid var(--border)',
        color: 'var(--text-sec)',
      }}
    >
      {theme === 'dark' ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <nav
        className="w-full max-w-[720px] rounded-2xl overflow-hidden pointer-events-auto"
        style={{
          background: 'rgba(var(--bg-rgb), 0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Top row: name + clock + theme toggle + socials */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <NavLink to="/about" style={{ display: 'inline-block', filter: 'var(--logo-filter)' }}>
            <img
              src="/logo.png"
              alt="amrlhakimii"
              style={{
                width: '28px',
                height: '28px',
                objectFit: 'contain',
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

        {/* Bottom row: icon nav */}
        <div className="flex items-center justify-between px-2 py-1.5">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              title={label}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150 hover:text-[var(--text-pri)]"
              style={({ isActive }) => isActive ? {
                background: 'rgba(var(--border-rgb), 0.6)',
                color: 'var(--accent)',
              } : {
                color: 'var(--text-sec)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[to.slice(1)]}
              </svg>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
