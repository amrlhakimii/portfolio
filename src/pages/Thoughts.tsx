import { motion } from 'framer-motion'

interface Post {
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  url: string
}

const posts: Post[] = [
  {
    title: 'Serendipity',
    excerpt: 'I think i\'ve heard more than a million times that you should find someone who loves you. I did. I have always been looking for it — until I found it where I least expected it.',
    date: '2026-02-04',
    readTime: '5 min read',
    tag: 'relationships',
    url: 'https://tulisankimi.medium.com/serendipity-b3fe9fa7a4a0',
  },
  {
    title: 'The Secret Behind Letting Go',
    excerpt: 'i blame myself for everything. i was the one who built expectations out of small moments, out of every conversation, every glance, every little gesture that probably meant nothing to you.',
    date: '2025-04-14',
    readTime: '3 min read',
    tag: 'relationships',
    url: 'https://tulisankimi.medium.com/the-secret-behind-letting-go-15cc3c3b8cd9',
  },
  {
    title: '"This world is a prison for a believer and a paradise for a disbeliever"',
    excerpt: 'Aku solat lima waktu, aku doa sehari semalam. Tapi kenapa aku yang diuji? Why do good things never happen to good people?',
    date: '2025-01-03',
    readTime: '1 min read',
    tag: 'faith',
    url: 'https://tulisankimi.medium.com/this-world-is-a-prison-for-a-believer-and-a-paradise-for-a-disbeliever-762103129132',
  },
  {
    title: 'do u ever feel like your life is static?',
    excerpt: 'Why isn\'t my life incredible like the others? It\'s questions like these that can make us feel not good enough, like complete failures, and frustrated about where we are in life.',
    date: '2025-01-03',
    readTime: '2 min read',
    tag: 'mental health',
    url: 'https://tulisankimi.medium.com/do-u-ever-feel-like-your-life-is-static-a09c232ac028',
  },
  {
    title: 'And if im being honest',
    excerpt: 'Some things are easier left unsaid. But if i\'m being honest — truly honest — here\'s what i\'d tell you.',
    date: '2025-01-03',
    readTime: '1 min read',
    tag: 'personal',
    url: 'https://tulisankimi.medium.com/and-if-im-being-honest-89853dc02211',
  },
]

const tagColors: Record<string, string> = {
  relationships: 'rgba(225,217,188,0.12)',
  faith:         'rgba(172,186,196,0.12)',
  'mental health': 'rgba(240,240,219,0.1)',
  personal:      'rgba(225,217,188,0.08)',
}

export default function Thoughts() {
  return (
    <div className="space-y-10">
      <header className="fade-up fade-up-1">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-3"
          style={{ color: 'var(--accent)', letterSpacing: '-0.02em', lineHeight: '1' }}
        >
          Thoughts
        </h1>
        <p style={{ color: 'var(--text-sec)' }} className="text-sm">
          i write the color of the chaos in my mind.
        </p>
        <a
          href="https://tulisankimi.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs transition-opacity duration-150 hover:opacity-80"
          style={{ color: 'var(--text-sec)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
          tulisankimi.medium.com →
        </a>
      </header>

      <div className="space-y-3 fade-up fade-up-2">
        {posts.map((post, i) => (
          <motion.article
            key={post.url}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          >
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(var(--bg-rgb),0.5)',
                border: '1px solid rgba(172,186,196,0.1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,186,196,0.25)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,186,196,0.1)'
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2
                  className="text-sm font-medium leading-snug transition-colors duration-150"
                  style={{ color: 'var(--text-pri)' }}
                >
                  {post.title}
                </h2>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full shrink-0 capitalize"
                  style={{
                    color: 'var(--text-sec)',
                    background: tagColors[post.tag] ?? 'rgba(172,186,196,0.1)',
                    border: '1px solid rgba(172,186,196,0.15)',
                  }}
                >
                  {post.tag}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-sec)' }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px]" style={{ color: 'rgba(172,186,196,0.5)' }}>
                    {new Date(post.date).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(172,186,196,0.4)' }}>·</span>
                  <span className="text-[10px]" style={{ color: 'rgba(172,186,196,0.5)' }}>{post.readTime}</span>
                </div>
                <span
                  className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ color: 'var(--text-pri)' }}
                >
                  read on medium →
                </span>
              </div>
            </a>
          </motion.article>
        ))}
      </div>

      {/* Footer note */}
      <p className="fade-up fade-up-3 text-xs text-center pb-2" style={{ color: 'rgba(172,186,196,0.35)' }}>
        all writings hosted on medium · click any card to read
      </p>
    </div>
  )
}
