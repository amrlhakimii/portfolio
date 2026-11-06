import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  meta?: ReactNode
  action?: ReactNode
}

const CARDS: Record<string, string> = {
  Projects: 'K♦', Photography: 'Q♥', Career: 'J♣', Music: '10♥', Thoughts: '9♣',
  TIL: '8♦', Uses: '7♠', Friends: '6♥', Bookmarks: '5♣', Profile: '4♦',
}

// Every page opens with the same deep red panel. Inside it the palette flips (see .on-red).
export default function PageHeader({ title, subtitle, meta, action }: PageHeaderProps) {
  return (
    <header className="on-red fade-up fade-up-1 rounded-3xl p-6 sm:p-8 space-y-4">
      {CARDS[title] && (
        <p className="text-xs font-serif" aria-hidden="true" style={{ color: 'var(--muted)' }}>{CARDS[title]}</p>
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1
          className="font-serif"
          style={{ fontSize: 'clamp(2.75rem, 10vw, 4.5rem)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          {title}<span style={{ color: 'var(--gold-on-red)' }}>.</span>
        </h1>
        {action}
      </div>
      {subtitle && <p className="text-sm max-w-prose" style={{ color: 'var(--text-sec)' }}>{subtitle}</p>}
      {meta && <p className="text-xs tabular-nums" style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: 'var(--muted)' }}>{meta}</p>}
    </header>
  )
}
