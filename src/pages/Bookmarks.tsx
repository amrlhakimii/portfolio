interface Bookmark {
  title: string
  url: string
  description: string
  category: string
  icon?: string
}

const bookmarks: Bookmark[] = [
  // Design
  {
    title: 'Refactoring UI',
    url: 'https://www.refactoringui.com',
    description: 'Practical design tips for developers. Changed how I think about spacing, color, and hierarchy.',
    category: 'design',
    icon: '🎨',
  },
  {
    title: 'Every Layout',
    url: 'https://every-layout.dev',
    description: 'Algorithmic CSS layout patterns. Reframed how I write CSS fundamentals.',
    category: 'design',
    icon: '📐',
  },
  {
    title: 'Typescale',
    url: 'https://typescale.com',
    description: 'Visual type scale calculator. Useful when setting up a new design system.',
    category: 'design',
    icon: '🔡',
  },
  {
    title: 'Coolors',
    url: 'https://coolors.co',
    description: 'Fast color palette generator. Great for quickly building harmonious schemes.',
    category: 'design',
    icon: '🎨',
  },
  {
    title: 'Realtime Colors',
    url: 'https://www.realtimecolors.com',
    description: 'Visualise your colour palette on a real UI before committing. Saves a lot of trial and error.',
    category: 'design',
    icon: '🌈',
  },
  {
    title: 'Palettte',
    url: 'https://palettte.app',
    description: 'Build and refine color palettes with smooth gradient interpolation.',
    category: 'design',
    icon: '🖌️',
  },
  {
    title: 'Hue.tools',
    url: 'https://hue.tools',
    description: 'Mix, blend and explore colors. Great companion when picking accent shades.',
    category: 'design',
    icon: '💡',
  },
  {
    title: 'UI Colors',
    url: 'https://uicolors.app',
    description: 'Generate Tailwind CSS color palettes from any hex — instant scale from 50 to 950.',
    category: 'design',
    icon: '🟦',
  },

  // Typography & Fonts
  {
    title: 'DaFont',
    url: 'https://www.dafont.com',
    description: 'Huge free font archive. My go-to for finding display and decorative fonts for design projects.',
    category: 'typography',
    icon: '🅰️',
  },
  {
    title: 'Google Fonts',
    url: 'https://fonts.google.com',
    description: 'Free, open-source fonts optimised for the web. Reliable for any project.',
    category: 'typography',
    icon: '🔤',
  },
  {
    title: 'Fontshare',
    url: 'https://www.fontshare.com',
    description: 'High-quality free fonts from Indian Type Foundry. Cleaner than most free font sites.',
    category: 'typography',
    icon: '✏️',
  },
  {
    title: 'WhatFont (Chrome extension)',
    url: 'https://chromewebstore.google.com/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm',
    description: 'Hover any text on any website to instantly see what font it\'s using.',
    category: 'typography',
    icon: '🔍',
  },

  // Dev tools
  {
    title: 'Excalidraw',
    url: 'https://excalidraw.com',
    description: 'Infinite whiteboard for sketching ideas. Fast, clean, exports to SVG.',
    category: 'dev tools',
    icon: '📝',
  },
  {
    title: 'Ray.so',
    url: 'https://ray.so',
    description: 'Beautiful code snippet screenshots. Good for sharing code on social media.',
    category: 'dev tools',
    icon: '📸',
  },
  {
    title: 'Hoppscotch',
    url: 'https://hoppscotch.io',
    description: 'Open-source API testing in the browser. Lightweight alternative to Postman.',
    category: 'dev tools',
    icon: '🚀',
  },
  {
    title: 'Regex101',
    url: 'https://regex101.com',
    description: 'Interactive regex builder and debugger with clear explanations. Saves hours.',
    category: 'dev tools',
    icon: '⚙️',
  },
  {
    title: 'roadmap.sh',
    url: 'https://roadmap.sh',
    description: 'Community-built learning roadmaps for different engineering tracks.',
    category: 'dev tools',
    icon: '🗺️',
  },

  // Resources & Learning
  {
    title: 'The Missing Semester of Your CS Education',
    url: 'https://missing.csail.mit.edu',
    description: 'MIT course on practical tools — shell, vim, git, debugging. Should be required reading.',
    category: 'learning',
    icon: '🎓',
  },
  {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    description: 'Still the best aggregator for tech, startups, and adjacent ideas.',
    category: 'learning',
    icon: '📰',
  },
  {
    title: 'CSS Tricks',
    url: 'https://css-tricks.com',
    description: 'Deep CSS guides, tricks, and almanac. Still relevant even with all the new tooling.',
    category: 'learning',
    icon: '💅',
  },

  // Photography & Creative
  {
    title: 'VSCO',
    url: 'https://vsco.co',
    description: 'Inspiration for photography editing styles and presets. Good for developing a consistent look.',
    category: 'creative',
    icon: '📷',
  },
  {
    title: 'Unsplash',
    url: 'https://unsplash.com',
    description: 'High-quality free stock photos. Useful for mockups, design references, and inspiration.',
    category: 'creative',
    icon: '🖼️',
  },
  {
    title: 'Remove.bg',
    url: 'https://www.remove.bg',
    description: 'One-click background removal. Accurate and fast — saves time in Photoshop.',
    category: 'creative',
    icon: '✂️',
  },
  {
    title: 'LottieFiles',
    url: 'https://lottiefiles.com',
    description: 'Lightweight animation files for web and mobile. Great for adding motion without video.',
    category: 'creative',
    icon: '🎬',
  },
]

const CATEGORY_ORDER = ['design', 'typography', 'dev tools', 'creative', 'learning']

const grouped = bookmarks.reduce<Record<string, Bookmark[]>>((acc, b) => {
  if (!acc[b.category]) acc[b.category] = []
  acc[b.category].push(b)
  return acc
}, {})

export default function Bookmarks() {
  return (
    <div className="space-y-10">
      <header className="fade-up fade-up-1">
        <h1 className="text-3xl font-semibold font-serif gradient-text mb-2">Bookmarks</h1>
        <p className="text-[var(--text-sec)] text-sm">links i keep returning to — tools, fonts, palettes, and rabbit holes</p>
      </header>

      <div className="space-y-8 fade-up fade-up-2">
        {CATEGORY_ORDER.filter(c => grouped[c]).map((category) => (
          <section key={category} className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
              <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
              {category}
              <span className="text-[var(--border)]">({grouped[category].length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {grouped[category].map((bookmark) => (
                <a
                  key={bookmark.url}
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl p-4 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: 'rgba(var(--bg-rgb),0.5)' }}
                >
                  <span className="text-lg shrink-0 mt-0.5">{bookmark.icon}</span>
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-medium text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150 flex items-center gap-1">
                      {bookmark.title}
                      <span className="text-[var(--border-hover)] group-hover:text-[var(--text-sec)] text-xs transition-colors duration-150">↗</span>
                    </p>
                    <p className="text-xs text-[var(--text-sec)] leading-relaxed">{bookmark.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
