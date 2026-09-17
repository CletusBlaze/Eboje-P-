'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, HandHelping, Handshake } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pathways = [
  {
    icon: <Heart size={28} />,
    title: 'Donate',
    description: 'Your contribution directly funds programs that change lives. Every amount matters.',
    cta: 'Support Our Work',
    href: '/donate',
    accent: true,
  },
  {
    icon: <HandHelping size={28} />,
    title: 'Volunteer',
    description: 'Give your skills and time to communities that need them. We have opportunities for everyone.',
    cta: 'Get Involved',
    href: '/get-involved#volunteer',
    accent: false,
  },
  {
    icon: <Handshake size={28} />,
    title: 'Partner',
    description: 'Organizations and businesses can build lasting impact alongside us. Let\'s create something meaningful.',
    cta: 'Become a Partner',
    href: '/get-involved#partner',
    accent: false,
  },
]

export default function GetInvolved() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-forest)',
        paddingBlock: 'var(--spacing-section)',
      }}
    >
      <div className="container-site">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>
            Get Involved
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-display-md)',
              fontWeight: 400,
              color: 'var(--color-white)',
              lineHeight: 1.1,
              maxWidth: '24ch',
              marginInline: 'auto',
            }}
          >
            There are many ways to make a difference.
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {pathways.map((pathway, i) => (
            <div
              key={pathway.title}
              ref={el => { cardsRef.current[i] = el }}
              style={{ opacity: 0 }}
            >
              <div
                style={{
                  backgroundColor: pathway.accent ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${pathway.accent ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 'var(--radius-card)',
                  padding: 'clamp(2rem, 3vw, 2.75rem)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  transition: 'transform 300ms ease, box-shadow 300ms ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Icon */}
                <span style={{ color: pathway.accent ? 'var(--color-obsidian)' : 'var(--color-gold)' }}>
                  {pathway.icon}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: pathway.accent ? 'var(--color-obsidian)' : 'var(--color-white)',
                    lineHeight: 1.1,
                  }}
                >
                  {pathway.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: pathway.accent ? 'rgba(7,27,22,0.75)' : 'rgba(255,255,255,0.55)',
                    flex: 1,
                  }}
                >
                  {pathway.description}
                </p>

                {/* CTA */}
                <Link
                  href={pathway.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: pathway.accent ? 'var(--color-obsidian)' : 'var(--color-gold)',
                    borderBottom: `1px solid ${pathway.accent ? 'rgba(7,27,22,0.3)' : 'rgba(198,161,91,0.4)'}`,
                    paddingBottom: '2px',
                    width: 'fit-content',
                  }}
                >
                  {pathway.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
