'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

interface ParallaxOptions {
  speed?: number   // 0.1 = subtle, 0.3 = noticeable. Default 0.15
  direction?: 'up' | 'down'
}

/**
 * Applies a subtle parallax scroll effect to an element.
 * Attach the returned ref to the element you want to move.
 *
 * Usage:
 *   const ref = useParallax({ speed: 0.15 })
 *   <div ref={ref} style={{ willChange: 'transform' }}>...</div>
 */
export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const { speed = 0.15, direction = 'up' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const multiplier = direction === 'up' ? -1 : 1

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: multiplier * speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed, direction])

  return ref
}
