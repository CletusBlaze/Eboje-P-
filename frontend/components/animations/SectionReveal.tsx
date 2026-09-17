'use client'

import { useFadeUp } from '@/hooks/useFadeUp'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  y?: number
}

/**
 * Wraps any content in a fade-up reveal on scroll.
 * Use this for content blocks that don't need custom animation logic.
 *
 * Usage:
 *   <SectionReveal>
 *     <p>This fades up when it enters the viewport.</p>
 *   </SectionReveal>
 */
export default function SectionReveal({
  children,
  className,
  style,
  delay = 0,
  y = 36,
}: SectionRevealProps) {
  const ref = useFadeUp<HTMLDivElement>({ y, delay })

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, ...style }}
    >
      {children}
    </div>
  )
}
