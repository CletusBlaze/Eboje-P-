'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from '@/lib/animations/gsap'
import { useParallax } from '@/hooks/useParallax'
import ScrollIndicator from './ScrollIndicator'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.12, direction: 'down' })
  const imageRef = parallaxRef
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Skip animation — just show everything
      gsap.set(
        [overlayRef.current, imageRef.current, eyebrowRef.current,
          line1Ref.current, line2Ref.current, descRef.current,
          btnsRef.current, scrollRef.current],
        { opacity: 1, y: 0, clipPath: 'none' }
      )
      return
    }

    // Set initial states
    gsap.set(imageRef.current, { opacity: 0, scale: 1.06 })
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(eyebrowRef.current, { opacity: 0, y: 16 })
    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 48 })
    gsap.set(descRef.current, { opacity: 0, y: 24 })
    gsap.set(btnsRef.current, { opacity: 0, y: 20 })
    gsap.set(scrollRef.current, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.2 })

    // 1 — Background image fades + slightly de-scales
    tl.to(imageRef.current, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' })

    // 2 — Dark overlay fades in
    tl.to(overlayRef.current, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=1.2')

    // 3 — Eyebrow label
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')

    // 4 — Heading line 1
    tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')

    // 5 — Heading line 2
    tl.to(line2Ref.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')

    // 6 — Description
    tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')

    // 7 — Buttons
    tl.to(btnsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    // 8 — Scroll indicator
    tl.to(scrollRef.current, { opacity: 1, duration: 0.5, ease: 'power1.out' }, '-=0.1')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-obsidian)',
        overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      {/* Background image — parallax applied via useParallax hook */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1800&q=80"
          alt="Community members working together"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>

      {/* Gradient overlay — dark at bottom, semi-dark overall */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              to bottom,
              rgba(7, 27, 22, 0.55) 0%,
              rgba(7, 27, 22, 0.45) 40%,
              rgba(7, 27, 22, 0.75) 75%,
              rgba(7, 27, 22, 0.92) 100%
            )
          `,
        }}
      />

      {/* Content */}
      <div
        className="container-site"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '8rem',
          paddingBottom: '6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
      >
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="label-section"
          style={{ marginBottom: '1.75rem', display: 'block' }}
        >
          Creating meaningful opportunities
        </span>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-display-xl)',
            fontWeight: 400,
            lineHeight: 1.0,
            color: 'var(--color-white)',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            maxWidth: '14ch',
          }}
        >
          <span
            ref={line1Ref}
            style={{ display: 'block' }}
          >
            Changing lives.
          </span>
          <span
            ref={line2Ref}
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.75)',
              fontStyle: 'italic',
            }}
          >
            Building possibilities.
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '38ch',
            marginBottom: '2.75rem',
          }}
        >
          Eboje P works with communities to create meaningful
          opportunities and build lasting impact across Nigeria.
        </p>

        {/* CTAs */}
        <div
          ref={btnsRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
        >
          <Link href="/about" className="btn btn-primary">
            Our Mission
          </Link>
          <Link href="/donate" className="btn btn-outline-light">
            Support Our Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <ScrollIndicator />
      </div>
    </section>
  )
}
