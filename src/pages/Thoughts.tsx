import PageHeader from '../components/PageHeader'


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


export default function Thoughts() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Thoughts"
        subtitle="I write the color of the chaos in my mind"
        action={
          <a
            href="https://tulisankimi.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150"
          >
            tulisankimi.medium.com ↗
          </a>
        }
      />

      <ol className="fade-up fade-up-2 border-b border-[var(--border)]">
        {posts.map((post, i) => (
          <li key={post.url} className="border-t border-[var(--border)]">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid md:grid-cols-[3rem_1fr_10rem] gap-2 md:gap-6 py-6 items-baseline"
            >
              <span className="text-xs tabular-nums text-[var(--accent)]" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="space-y-2">
                <span className="block font-serif text-2xl leading-snug text-[var(--text-pri)] group-hover:text-[var(--accent)] transition-colors duration-150">{post.title}</span>
                <span className="block text-sm leading-relaxed text-[var(--text-sec)] max-w-prose line-clamp-2">{post.excerpt}</span>
              </span>
              <span className="text-xs text-[var(--muted)] md:text-right">
                <span className="block capitalize">{post.tag}</span>
                <span className="block tabular-nums">
                  {new Date(post.date).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })} · {post.readTime}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <p className="fade-up fade-up-3 text-xs text-[var(--muted)]">All writings are hosted on Medium</p>
    </div>
  )
}
