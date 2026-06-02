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
      { name: '.NET', description: 'Backend framework used at The Access Group. Building APIs and integrations that connect enterprise systems end-to-end.', tag: 'backend', love: true },
      { name: 'Firebase', description: 'Auth, Firestore, and hosting for projects that need a backend without building one.', tag: 'backend', url: 'https://firebase.google.com' },
      { name: 'Supabase', description: 'Postgres-backed backend with auth and Row Level Security. Reached for it when data is relational and I want SQL over a document store.', tag: 'backend', url: 'https://supabase.com' },
      { name: 'Framer Motion', description: 'Animation library for React. Handles page transitions, exit animations, and layout shifts that CSS alone can\'t do cleanly.', tag: 'animation', url: 'https://www.framer.com/motion' },
      { name: 'GSAP', description: 'Industry-standard animation engine. Used for cinematic entrance sequences, timeline-based animations, and anything that needs precise choreography — like the Hootang dashboard.', tag: 'animation', love: true, url: 'https://gsap.com' },
      { name: 'Anime.js', description: 'Lightweight JS animation library. Clean API for animating CSS properties, SVGs, and DOM attributes. Good for targeted micro-animations without pulling in a full toolkit.', tag: 'animation', url: 'https://animejs.com' },
      { name: 'React Router v7', description: 'Routing for React apps. The v7 loader pattern replaces useEffect-on-mount fetching — data loads before the route renders.', tag: 'routing', url: 'https://reactrouter.com' },
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
    label: 'ai & prompting',
    emoji: '🤖',
    items: [
      { name: 'Claude', description: 'My primary AI collaborator — for code reviews, PRD drafting, architecture decisions, and deep prompt engineering. The model I reach for first when quality of output actually matters.', tag: 'llm', love: true, url: 'https://claude.ai' },
      { name: 'Claude Code', description: 'Agentic coding tool in the terminal. Handles full dev workflows — reads, edits, runs commands, and ships code with context of the whole codebase. Daily driver for serious implementation work.', tag: 'coding ai', love: true },
      { name: 'Devin CLI', description: 'AI software engineer agent. Delegates whole tasks rather than individual completions — useful for parallel workstreams and longer-running feature work.', tag: 'coding ai' },
      { name: 'ChatGPT', description: 'Second opinion and quick ideation. Good for brainstorming alternative approaches when I want a different perspective.', tag: 'llm', url: 'https://chatgpt.com' },
      { name: 'GitHub Copilot', description: 'In-editor autocomplete for boilerplate and mid-flow suggestions. Most useful when I already know the shape of what I want.', tag: 'coding ai' },
      { name: 'Prompt Engineering', description: 'Writing structured, precise prompts that produce consistent, useful output — system prompts, few-shot examples, chain-of-thought patterns. I treat a good prompt like a well-written spec.', tag: 'skill', love: true },
      { name: 'AI-assisted PRDs', description: 'Using AI to draft, refine, and stress-test Product Requirement Documents before writing a line of code. Catches scope gaps and edge cases early.', tag: 'workflow' },
    ],
  },
  {
    label: 'tools & platforms',
    emoji: '🛠️',
    items: [
      { name: 'Microsoft Azure', description: 'Cloud platform for hosting, identity, and infrastructure. Working with Azure services across the full deployment lifecycle — from dev to preprod to production.', tag: 'cloud', love: true },
      { name: 'Azure DevOps', description: 'CI/CD pipelines, repo management, and release tracking. Handles the entire build-to-deploy chain — including preprod validation before anything hits production.', tag: 'devops', love: true },
      { name: 'Databricks', description: 'Data engineering and ML platform. Used for data pipeline work and analytics — part of the broader architecture at Access Group.', tag: 'data' },
      { name: 'EVO Builder', description: 'Low-code configuration tool within the Access Evolution ecosystem. Used to build and configure workflows, forms, and business logic without writing raw code every time.', tag: 'internal' },
      { name: 'Automated EVO Workflow', description: 'Workflow automation within the EVO platform — designing trigger-based flows to reduce manual steps and connect systems end-to-end. Handled full ownership from spec to deployment.', tag: 'automation', love: true },
      { name: 'REST API Integration', description: 'Connecting systems via API — consuming and building endpoints that tie together internal services and external platforms. Part of the core work on the Flightpath email automation project.', tag: 'backend' },
      { name: 'Salesforce', description: 'CRM platform for managing customer data, pipelines, and workflows. Used for tracking interactions and automating business processes.', tag: 'crm' },
      { name: 'Access Focalpoint', description: 'Business management software for handling operations, reporting, and workflow coordination across teams.', tag: 'operations' },
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
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3" style={{ letterSpacing: "-0.02em", lineHeight: "1" }}>Uses</h1>
        <p className="text-[var(--text-sec)] text-sm">the full stack — hardware, software, design tools, and creative workflow</p>
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
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
            } : {
              background: 'rgba(var(--bg-rgb),0.4)',
              borderColor: 'var(--border)',
              color: 'var(--text-sec)',
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
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-sec)] flex items-center gap-2">
              <span style={{ fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 400 }}>//</span>
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="group relative rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] p-4 space-y-1.5 transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: 'rgba(var(--bg-rgb),0.45)' }}
                >
                  {/* Love badge */}
                  {item.love && (
                    <span className="absolute top-3 right-3 text-[10px] text-[var(--text-pri)]/50">★</span>
                  )}

                  <div className="flex items-center gap-2 pr-4">
                    <p className="text-sm font-medium text-[var(--text-pri)]">{item.name}</p>
                    {item.tag && (
                      <span
                        className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border"
                        style={{ color: 'var(--text-sec)', borderColor: 'var(--border)', background: 'rgba(var(--border-rgb),0.6)' }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-sec)] leading-relaxed">{item.description}</p>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)] hover:text-[var(--text-sec)] transition-colors duration-150"
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
      <p className="fade-up fade-up-4 text-[10px] text-[var(--border)] flex items-center gap-2">
        <span className="text-[var(--text-pri)]/40">★</span>
        <span>= daily favourite</span>
      </p>
    </div>
  )
}
