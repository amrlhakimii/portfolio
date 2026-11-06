import type { ReactNode } from 'react'
import Footer from './Footer'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="max-w-[960px] mx-auto px-4 pt-8 sm:pt-12 pb-40">
      {children}
      <Footer />
    </main>
  )
}
