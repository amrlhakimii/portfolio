import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="max-w-[720px] mx-auto px-4 pt-[3.75rem] pb-44">
      {children}
    </main>
  )
}
