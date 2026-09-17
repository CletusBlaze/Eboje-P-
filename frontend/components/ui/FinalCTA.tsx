'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(line1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo(line2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.65')
        .fromTo(btnRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-obsidian)',
        paddingBlock: 'clamp(6rem, 12vw, 10rem)',
        borderTop: '1px solid rgba(198,161,91,0.12)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Huge heading */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
          }}
        >
          <span
            ref={line1Ref}
            style={{
              display: 'block',
              color: 'var(--color-white)',
            }}
          >
            There is more we can do.
          </span>
          <span
            ref={line2Ref}
            style={{
              display: 'block',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
            }}
          >
            Together.
          </span>
        </h2>

        <div ref={btnRef}>
          <Link href="/donate" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '1rem 2.5rem' }}>
            Support Eboje P
          </Link>
        </div>
      </div>
    </section>
  )
}
