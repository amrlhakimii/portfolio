import SectionLabel from '../components/SectionLabel'
import PageHeader from '../components/PageHeader'

interface Bookmark {
  title: string
  url: string
  description: string
  category: string
}

const bookmarks: Bookmark[] = [
  // Design
  {
    title: 'Refactoring UI',
    url: 'https://www.refactoringui.com',
    description: 'Practical design tips for developers. Changed how I think about spacing, color, and hierarchy.',
    category: 'design',
  },
  {
    title: 'Every Layout',
    url: 'https://every-layout.dev',
    description: 'Algorithmic CSS layout patterns. Reframed how I write CSS fundamentals.',
    category: 'design',
  },
  {
    title: 'Typescale',
    url: 'https://typescale.com',
    description: 'Visual type scale calculator. Useful when setting up a new design system.',
    category: 'design',
  },
  {
    title: 'Coolors',
    url: 'https://coolors.co',
    description: 'Fast color palette generator. Great for quickly building harmonious schemes.',
    category: 'design',
  },
  {
    title: 'Realtime Colors',
    url: 'https://www.realtimecolors.com',
    description: 'Visualise your colour palette on a real UI before committing. Saves a lot of trial and error.',
    category: 'design',
  },
  {
    title: 'Palettte',
    url: 'https://palettte.app',
    description: 'Build and refine color palettes with smooth gradient interpolation.',
    category: 'design',
  },
  {
    title: 'Hue.tools',
    url: 'https://hue.tools',
    description: 'Mix, blend and explore colors. Great companion when picking accent shades.',
    category: 'design',
  },
  {
    title: 'UI Colors',
    url: 'https://uicolors.app',
    description: 'Generate Tailwind CSS color palettes from any hex — instant scale from 50 to 950.',
    category: 'design',
  },

  // Typography & Fonts
  {
    title: 'DaFont',
    url: 'https://www.dafont.com',
    description: 'Huge free font archive. My go-to for finding display and decorative fonts for design projects.',
    category: 'typography',
  },
  {
    title: 'Google Fonts',
    url: 'https://fonts.google.com',
    description: 'Free, open-source fonts optimised for the web. Reliable for any project.',
    category: 'typography',
  },
  {
    title: 'Fontshare',
    url: 'https://www.fontshare.com',
    description: 'High-quality free fonts from Indian Type Foundry. Cleaner than most free font sites.',
    category: 'typography',
  },
  {
    title: 'WhatFont (Chrome extension)',
    url: 'https://chromewebstore.google.com/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm',
    description: 'Hover any text on any website to instantly see what font it\'s using.',
    category: 'typography',
  },

  // Dev tools
  {
    title: 'Excalidraw',
    url: 'https://excalidraw.com',
    description: 'Infinite whiteboard for sketching ideas. Fast, clean, exports to SVG.',
    category: 'dev tools',
  },
  {
    title: 'Ray.so',
    url: 'https://ray.so',
    description: 'Beautiful code snippet screenshots. Good for sharing code on social media.',
    category: 'dev tools',
  },
  {
    title: 'Hoppscotch',
    url: 'https://hoppscotch.io',
    description: 'Open-source API testing in the browser. Lightweight alternative to Postman.',
    category: 'dev tools',
  },
  {
    title: 'Regex101',
    url: 'https://regex101.com',
    description: 'Interactive regex builder and debugger with clear explanations. Saves hours.',
    category: 'dev tools',
  },
  {
    title: 'roadmap.sh',
    url: 'https://roadmap.sh',
    description: 'Community-built learning roadmaps for different engineering tracks.',
    category: 'dev tools',
  },

  // Resources & Learning
  {
    title: 'The Missing Semester of Your CS Education',
    url: 'https://missing.csail.mit.edu',
    description: 'MIT course on practical tools — shell, vim, git, debugging. Should be required reading.',
    category: 'learning',
  },
  {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    description: 'Still the best aggregator for tech, startups, and adjacent ideas.',
    category: 'learning',
  },
  {
    title: 'CSS Tricks',
    url: 'https://css-tricks.com',
    description: 'Deep CSS guides, tricks, and almanac. Still relevant even with all the new tooling.',
    category: 'learning',
  },

  // Photography & Creative
  {
    title: 'VSCO',
    url: 'https://vsco.co',
    description: 'Inspiration for photography editing styles and presets. Good for developing a consistent look.',
    category: 'creative',
  },
  {
    title: 'Unsplash',
    url: 'https://unsplash.com',
    description: 'High-quality free stock photos. Useful for mockups, design references, and inspiration.',
    category: 'creative',
  },
  {
    title: 'Remove.bg',
    url: 'https://www.remove.bg',
    description: 'One-click background removal. Accurate and fast — saves time in Photoshop.',
    category: 'creative',
  },
  {
    title: 'LottieFiles',
    url: 'https://lottiefiles.com',
    description: 'Lightweight animation files for web and mobile. Great for adding motion without video.',
    category: 'creative',
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
    <div className="space-y-12">
      <PageHeader title="Bookmarks" subtitle="Links I keep returning to: tools, fonts, palettes, and rabbit holes" />

      <div className="space-y-12 fade-up fade-up-2">
        {CATEGORY_ORDER.filter(c => grouped[c]).map((category) => (
          <section key={category} className="grid md:grid-cols-[10rem_1fr] gap-4 md:gap-10">
            <div className="md:sticky md:top-6 self-start space-y-1">
              <SectionLabel><span className="capitalize">{category}</span></SectionLabel>
              <p className="text-xs tabular-nums text-[var(--muted)]">{grouped[category].length} links</p>
            </div>
            <ul className="border-b border-[var(--border)]">
              {grouped[category].map((bookmark) => (
                <li key={bookmark.url} className="border-t border-[var(--border)]">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid sm:grid-cols-[13rem_1fr_auto] gap-1 sm:gap-6 py-4 items-baseline"
                  >
                    <span className="font-serif text-lg text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">{bookmark.title}</span>
                    <span className="text-sm text-[var(--text-sec)] leading-relaxed">{bookmark.description}</span>
                    <span className="hidden sm:inline text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-150" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
