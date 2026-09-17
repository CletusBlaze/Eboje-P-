'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

interface FadeUpOptions {
  y?: number
  duration?: number
  stagger?: number
  delay?: number
  start?: string
}

/**
 * Fades up one or multiple elements when they enter the viewport.
 * Returns a ref to attach to the trigger element (usually the section).
 *
 * Usage — single element:
 *   const ref = useFadeUp<HTMLDivElement>()
 *   <div ref={ref} style={{ opacity: 0 }}>...</div>
 *
 * Usage — multiple children (pass targets):
 *   const sectionRef = useFadeUp<HTMLElement>({ stagger: 0.12 }, '.card')
 *   <section ref={sectionRef}>...</section>
 */
export function useFadeUp<T extends HTMLElement>(
  options: FadeUpOptions = {},
  childSelector?: string
) {
  const ref = useRef<T>(null)
  const { y = 40, duration = 0.7, stagger = 0, delay = 0, start = 'top 80%' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const targets = childSelector ? el.querySelectorAll(childSelector) : [el]
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const targets = childSelector ? el.querySelectorAll(childSelector) : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
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
  }, [y, duration, stagger, delay, start, childSelector])

  return ref
}
