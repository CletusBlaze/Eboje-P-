'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ScrollIndicator() {
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !arrowRef.current) return

    gsap.to(arrowRef.current, {
      y: 8,
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
      }}
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      aria-label="Scroll down"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.625rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        Scroll
      </span>
      <div ref={arrowRef}>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          aria-hidden="true"
        >
          <line x1="8" y1="0" x2="8" y2="18" stroke="rgba(198,161,91,0.7)" strokeWidth="1" />
          <polyline
            points="3,13 8,19 13,13"
            stroke="rgba(198,161,91,0.7)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}
