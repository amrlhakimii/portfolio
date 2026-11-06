export type Suit = '♠' | '♥' | '♦' | '♣'

interface PlayingCardProps {
  rank: string
  suit: Suit
  title: string
  desc: string
  rotate: number
}

const RED = '#c8102e'
const INK = '#0a1a33'
const PAPER = '#f6f3ec'

function Corner({ rank, suit, color, flip }: { rank: string; suit: Suit; color: string; flip?: boolean }) {
  return (
    <span
      className={`absolute flex flex-col items-center leading-none font-serif ${flip ? 'bottom-3 right-3 rotate-180' : 'top-3 left-3'}`}
      style={{ color }}
      aria-hidden="true"
    >
      <span className="text-xl font-medium">{rank}</span>
      <span className="text-lg">{suit}</span>
    </span>
  )
}

// Fans out on wide screens, lifts and straightens on hover. Plain grid on phones.
const cardBase =
  'relative aspect-[5/7] w-full sm:w-44 sm:shrink-0 sm:-ml-6 sm:first:ml-0 rounded-2xl overflow-hidden ' +
  'transition-[translate,rotate] duration-200 sm:[rotate:var(--r)] sm:hover:-translate-y-5 sm:hover:[rotate:0deg] sm:hover:z-10'

export function PlayingCard({ rank, suit, title, desc, rotate }: PlayingCardProps) {
  const color = suit === '♥' || suit === '♦' ? RED : INK
  return (
    <div
      className={cardBase}
      style={{ background: PAPER, border: `1px solid ${INK}`, ['--r' as string]: `${rotate}deg`, boxShadow: '0 1px 0 rgba(0,0,0,0.2)' }}
    >
      <Corner rank={rank} suit={suit} color={color} />
      <Corner rank={rank} suit={suit} color={color} flip />
      <span
        className="absolute inset-0 flex items-center justify-center font-serif select-none"
        style={{ color, opacity: 0.08, fontSize: '9rem' }}
        aria-hidden="true"
      >
        {suit}
      </span>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pl-5 pr-5 sm:pr-11 gap-2">
        <p className="font-serif text-xl leading-tight" style={{ color: INK, letterSpacing: '-0.01em' }}>{title}</p>
        <p className="text-xs leading-snug" style={{ color: '#3d3a33' }}>{desc}</p>
      </div>
    </div>
  )
}

export function JokerCard({ rotate, caption }: { rotate: number; caption: string }) {
  return (
    <div
      className={cardBase}
      style={{ background: INK, border: `1px solid ${PAPER}`, ['--r' as string]: `${rotate}deg` }}
    >
      <img src="/joker.svg" alt="Jester juggling a camera, code, a pen nib and a shield" className="absolute inset-0 w-full h-full object-cover" />
      <span
        className="absolute bottom-0 inset-x-0 text-center py-2 text-xs font-medium"
        style={{ background: 'rgba(10,26,51,0.85)', color: '#d2b06a', fontFamily: 'ui-monospace, Consolas, monospace' }}
      >
        JOKER · {caption}
      </span>
    </div>
  )
}

const suitColor = (suit: Suit) => (suit === '♥' || suit === '♦' ? RED : INK)

// Small decorative card: rank and suit in the corners, suit in the middle.
export function MiniCard({ rank, suit, rotate = 0, className = '' }: { rank: string; suit: Suit; rotate?: number; className?: string }) {
  const color = suitColor(suit)
  return (
    <span
      className={`relative inline-block aspect-[5/7] rounded-lg overflow-hidden shrink-0 ${className}`}
      style={{ width: '2.75rem', background: PAPER, border: `1px solid ${INK}`, rotate: `${rotate}deg`, color }}
      aria-hidden="true"
    >
      <span className="absolute top-1 left-1.5 flex flex-col items-center font-serif leading-none" style={{ fontSize: '0.7rem' }}>
        <span>{rank}</span>
        <span>{suit}</span>
      </span>
      <span className="absolute inset-0 flex items-center justify-center font-serif" style={{ fontSize: '1.4rem', opacity: 0.9 }}>{suit}</span>
    </span>
  )
}

// Card back: navy with a red lattice and a gold border.
export function CardBack({ className = '' }: { className?: string }) {
  return (
    <span
      className={`block aspect-[5/7] rounded-xl ${className}`}
      style={{
        background: `repeating-linear-gradient(45deg, #ef0107 0 2px, transparent 2px 11px), repeating-linear-gradient(-45deg, #ef0107 0 2px, transparent 2px 11px), ${INK}`,
        border: '3px solid #d2b06a',
        outline: `1px solid ${INK}`,
      }}
      aria-hidden="true"
    />
  )
}
