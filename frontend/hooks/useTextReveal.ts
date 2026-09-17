'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

interface TextRevealOptions {
  duration?: number
  stagger?: number
  start?: string
  delay?: number
}

/**
 * Reveals text lines by animating from y offset + opacity.
 * Attach the returned ref to the parent element.
 * Each direct child with data-line attribute will be animated.
 *
 * Usage:
 *   const ref = useTextReveal<HTMLHeadingElement>()
 *   <h2 ref={ref}>
 *     <span data-line>Line one</span>
 *     <span data-line>Line two</span>
 *   </h2>
 */
export function useTextReveal<T extends HTMLElement>(options: TextRevealOptions = {}) {
  const ref = useRef<T>(null)
  const { duration = 0.9, stagger = 0.12, start = 'top 80%', delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lines = el.querySelectorAll('[data-line]')
    if (!lines.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(lines, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 52 },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [duration, stagger, start, delay])

  return ref
}
