'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

interface CountUpOptions {
  duration?: number
  start?: string
  format?: (value: number) => string
}

/**
 * Animates a number from 0 to `target` when the trigger enters the viewport.
 * Returns a ref to attach to the element that displays the number.
 *
 * Usage:
 *   const ref = useCountUp(12000, { format: v => v >= 1000 ? `${(v/1000).toFixed(0)}K+` : String(v) })
 *   <span ref={ref}>0</span>
 */
export function useCountUp(
  target: number,
  options: CountUpOptions = {}
) {
  const ref = useRef<HTMLSpanElement>(null)
  const {
    duration = 2,
    start = 'top 75%',
    format = (v) => String(Math.round(v)),
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.textContent = format(target)
      return
    }

    el.textContent = format(0)

    const obj = { val: 0 }
    const anim = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = format(obj.val) },
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      anim.kill()
      ScrollTrigger.getAll()
        .filter(t => t.vars.trigger === el)
        .forEach(t => t.kill())
    }
  }, [target, duration, start, format])

  return ref
}
