import { useState } from 'react'

interface Item {
  name: string
  description: string
  tag?: string
  love?: boolean   // shows a ★ badge
  url?: string
}

interface Category {
  label: string
  emoji: string
  items: Item[]
}

const categories: Category[] = [
  {
    label: 'hardware',
    emoji: '🖥️',
    items: [
      { name: 'MacBook Pro M1', description: 'Main machine. Handles dev, video editing, Lightroom, and running Figma + VS Code side by side without a fan spin.', tag: 'daily driver', love: true },
      { name: 'iPhone', description: 'Primary phone. Also my main camera for casual shots when the DSLR is overkill.', tag: 'always on me' },
      { name: 'Fujifilm XT30-ii', description: 'My photography workhorse — weddings, events, products. Every shoot starts here.', tag: 'photography', love: true },
      { name: 'External Monitor', description: '24" 1080p IPS. Colour accuracy matters when editing photos and designing — this delivers.', tag: 'workspace' },
      { name: 'Mechanical Keyboard', description: 'Tactile switches. Long sessions are way easier. Clickiest thing in my setup.', tag: 'workspace' },
      { name: 'DJI Action 5 Pro', description: 'My videography firearm — compact, stable, and packed with features for action shots.', tag: 'videography' },

    ],
  },
  {
    label: 'development',
    emoji: '💻',
    items: [
      { name: 'VS Code', description: 'Primary editor. Extensions: Prettier, ESLint, GitLens, Tailwind IntelliSense, Auto Rename Tag.', tag: 'editor', love: true, url: 'https://code.visualstudio.com' },
      { name: 'iTerm2 + zsh', description: 'Terminal setup with Oh My Zsh and custom aliases. Fast, themeable, and way better than the default.', tag: 'terminal', url: 'https://iterm2.com' },
      { name: 'React + TypeScript', description: 'My default frontend stack. TypeScript catches the dumb errors before runtime does.', tag: 'stack', love: true },
      { name: 'Vite', description: 'Build tool. Instant HMR, sub-second cold starts. Cannot go back to CRA.', tag: 'build', url: 'https://vitejs.dev' },
      { name: 'TailwindCSS', description: 'Utility-first CSS. Once it clicks, writing plain CSS feels backwards.', tag: 'styling', love: true, url: 'https://tailwindcss.com' },
      { name: 'Git + GitHub', description: 'Version control and remote storage. Commit often, commit meaningfully.', tag: 'workflow', url: 'https://github.com' },
      { name: 'Node.js + Express', description: 'Go-to for quick APIs and backend work. Simple, fast to spin up.', tag: 'backend' },
      { name: 'Firebase', description: 'Auth, Firestore, and hosting for projects that need a backend without building one.', tag: 'backend', url: 'https://firebase.google.com' },
    ],
  },
  {
    label: 'design',
    emoji: '🎨',
    items: [
      { name: 'Figma', description: 'UI design, wireframes, and component exploration. The browser-based part means I can work from anywhere.', tag: 'ui/ux', love: true, url: 'https://figma.com' },
      { name: 'Adobe Photoshop', description: 'Photo retouching, composites, and anything that needs pixel-level control.', tag: 'adobe', love: true },
      { name: 'Adobe Illustrator', description: 'Vector work — logos, jersey designs, print-ready artwork for Blugrafix.', tag: 'adobe', love: true },
      { name: 'Adobe Lightroom', description: 'My entire photography post-processing workflow lives here. Presets, colour grading, batch export.', tag: 'photo', love: true },
      { name: 'Adobe Premiere Pro', description: 'Video editing — from wedding films to short-form content. Timeline-based, reliable.', tag: 'video' },
      { name: 'Adobe After Effects', description: 'Motion graphics and visual effects. Goes deeper than Premiere when things need to move.', tag: 'motion' },
      { name: 'Canva', description: 'Quick social media graphics, presentations, and client mood boards. Fast when Illustrator is overkill.', tag: 'quick design', url: 'https://canva.com' },
      { name: 'Excalidraw', description: 'Whiteboard for rough diagrams and system sketches. Low friction, exports clean SVGs.', tag: 'sketch', url: 'https://excalidraw.com' },
      { name: 'ColorSlurp', description: 'System-wide color picker. Faster than anything built-in.', tag: 'utility' },
    ],
  },
  {
    label: 'productivity',
    emoji: '⚡',
    items: [
      { name: 'Notion', description: 'Notes, project tracking, and dumping ground for ideas. My second brain.', tag: 'notes', love: true, url: 'https://notion.so' },
      { name: 'Arc Browser', description: 'Replaced Chrome entirely. Spaces keep freelance and uni work separated cleanly.', tag: 'browser', love: true, url: 'https://arc.net' },
      { name: 'Raycast', description: 'Spotlight replacement. Clipboard history, window management, and custom scripts. Worth every second of setup.', tag: 'launcher', love: true, url: 'https://raycast.com' },
      { name: 'Spotify', description: 'Background music for every mode — lo-fi for focus, hyperpop for debugging, silence for deadlines.', tag: 'focus', url: 'https://spotify.com' },
    ],
  },
  {
    label: 'photography workflow',
    emoji: '📷',
    items: [
      { name: 'Adobe Lightroom', description: 'Primary editing and culling. Import → cull → edit → export. Every single shoot.', tag: 'core', love: true },
      { name: 'Adobe Photoshop', description: 'For composites, background removal, and retouching that Lightroom can\'t handle.', tag: 'retouch' },
      { name: 'Google Drive', description: 'Client delivery and backup. Every gallery gets its own shared folder.', tag: 'delivery' },
      { name: 'Canva', description: 'Client-facing previews, watermarked samples, and quick quote graphics.', tag: 'client work', url: 'https://canva.com' },
      { name: 'VSCO', description: 'Preset inspiration and reference for building my own editing style.', tag: 'inspiration', url: 'https://vsco.co' },
    ],
  },
]

const ALL = 'all'

export default function Uses() {
  const [active, setActive] = useState(ALL)

  const filters = [ALL, ...categories.map(c => c.label)]
  const visible = active === ALL ? categories : categories.filter(c => c.label === active)

  return (
    <div className="space-y-8">
      <header className="fade-up fade-up-1">
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Uses</h1>
        <p className="text-[#acbac4] text-sm">the full stack — hardware, software, design tools, and creative workflow</p>
      </header>

      {/* Filter tabs */}
      <div className="fade-up fade-up-2 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 capitalize"
            style={active === f ? {
              background: 'rgba(240,240,219,0.12)',
              borderColor: '#f0f0db',
              color: '#f0f0db',
            } : {
              background: 'rgba(48,54,79,0.4)',
              borderColor: '#3a4060',
              color: '#acbac4',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-8 fade-up fade-up-3">
        {visible.map((cat) => (
          <section key={cat.label} className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-[#acbac4] flex items-center gap-2">
              <span>{cat.emoji}</span>
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="group relative rounded-xl border border-[#3a4060] hover:border-[#4a5278] p-4 space-y-1.5 transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: 'rgba(48,54,79,0.45)' }}
                >
                  {/* Love badge */}
                  {item.love && (
                    <span className="absolute top-3 right-3 text-[10px] text-[#e1d9bc]/50">★</span>
                  )}

                  <div className="flex items-center gap-2 pr-4">
                    <p className="text-sm font-medium text-[#e1d9bc]">{item.name}</p>
                    {item.tag && (
                      <span
                        className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border"
                        style={{ color: '#acbac4', borderColor: '#3a4060', background: 'rgba(58,64,96,0.6)' }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#acbac4] leading-relaxed">{item.description}</p>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-[#606880] hover:text-[#acbac4] transition-colors duration-150"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.url.replace('https://', '').replace('www.', '')} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Legend */}
      <p className="fade-up fade-up-4 text-[10px] text-[#3a4060] flex items-center gap-2">
        <span className="text-[#e1d9bc]/40">★</span>
        <span>= daily favourite</span>
      </p>
    </div>
  )
}
