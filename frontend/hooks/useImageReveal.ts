'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

interface ImageRevealOptions {
  duration?: number
  start?: string
  fromScale?: number
}

/**
 * Reveals an image with a fade + subtle scale-down on scroll entry.
 * Attach the returned ref to the image wrapper div.
 *
 * Usage:
 *   const ref = useImageReveal()
 *   <div ref={ref} style={{ opacity: 0 }}>
 *     <Image ... />
 *   </div>
 */
export function useImageReveal<T extends HTMLElement>(options: ImageRevealOptions = {}) {
  const ref = useRef<T>(null)
  const { duration = 1.1, start = 'top 75%', fromScale = 1.05 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: fromScale },
        {
          opacity: 1,
          scale: 1,
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [duration, start, fromScale])

  return ref
}
