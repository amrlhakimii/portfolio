import { MiniCard } from './PlayingCard'

export default function Footer() {
  return (
    <section className="on-red rounded-3xl p-8 sm:p-12 mt-20 grid md:grid-cols-[1fr_auto] gap-10 items-center">
      <div className="space-y-8">
      <p className="text-xs" style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: 'var(--muted)' }}>
        // deal me in · ♠ ♥ ♦ ♣
      </p>
      <h2 className="font-serif max-w-[16ch]" style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em' }}>
        Have something to build, shoot or secure?
      </h2>
      <div className="flex items-center gap-3 flex-wrap">
        <a
          href="mailto:amirulxhakimi@gmail.com"
          className="px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
          style={{ background: 'var(--accent-fill)', color: 'var(--on-accent)' }}
        >
          amirulxhakimi@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/amrlhakimii/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-lg text-sm border border-[var(--border)] text-[var(--text-pri)] hover:border-[var(--border-hover)] transition-colors duration-150"
        >
          LinkedIn
        </a>
      </div>
      </div>
      <div className="hidden md:flex items-center" aria-hidden="true">
        <MiniCard rank="A" suit="♠" rotate={-14} className="!w-20 -mr-6" />
        <MiniCard rank="A" suit="♥" rotate={-5} className="!w-20 -mr-6" />
        <MiniCard rank="A" suit="♦" rotate={5} className="!w-20 -mr-6" />
        <MiniCard rank="A" suit="♣" rotate={14} className="!w-20" />
      </div>
    </section>
  )
}
