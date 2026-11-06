import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  aside?: ReactNode
}

// The "// section" label: a comment in the developer's source, in sentence case.
export default function SectionLabel({ children, aside }: SectionLabelProps) {
  return (
    <h2 className="text-sm font-medium text-[var(--text-sec)] flex items-center gap-2">
      <span style={{ fontFamily: 'ui-monospace, Consolas, monospace', color: 'var(--accent)', fontWeight: 400 }}>//</span>
      {children}
      {aside && <span className="ml-auto">{aside}</span>}
    </h2>
  )
}
