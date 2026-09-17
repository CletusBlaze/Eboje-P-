'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Varied aspect ratios — editorial feel, not a uniform grid
const images = [
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=75', alt: 'Community gathering', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=75', alt: 'Youth program', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=75', alt: 'Education program', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=75', alt: 'Women empowerment', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=75', alt: 'Healthcare outreach', span: 'wide' },
]

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.1,
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
        backgroundColor: 'var(--color-ivory)',
        paddingBlock: 'var(--spacing-section)',
      }}
    >
      <div className="container-site">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          <div>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>
              Gallery
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-display-md)',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
              }}
            >
              Moments of impact.
            </h2>
          </div>
          <Link href="/impact#gallery" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>
            View Gallery
          </Link>
        </div>

        {/* Editorial masonry grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
            gap: '0.75rem',
          }}
        >
          {/* Row 1: wide (8 cols) + tall (4 cols, spans 2 rows) */}
          <div style={{ gridColumn: '1 / 9', gridRow: '1', position: 'relative', aspectRatio: '16/9', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            <Image src={images[0].src} alt={images[0].alt} fill sizes="(max-width: 768px) 100vw, 66vw" style={{ objectFit: 'cover', transition: 'transform 500ms ease' }} onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.03)')} onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')} />
          </div>
          <div style={{ gridColumn: '9 / 13', gridRow: '1 / 3', position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden', minHeight: '280px' }}>
            <Image src={images[1].src} alt={images[1].alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', transition: 'transform 500ms ease' }} onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.03)')} onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')} />
          </div>

          {/* Row 2: two normal (4 cols each) */}
          <div style={{ gridColumn: '1 / 5', gridRow: '2', position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            <Image src={images[2].src} alt={images[2].alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', transition: 'transform 500ms ease' }} onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.03)')} onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')} />
          </div>
          <div style={{ gridColumn: '5 / 9', gridRow: '2', position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            <Image src={images[3].src} alt={images[3].alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', transition: 'transform 500ms ease' }} onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.03)')} onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')} />
          </div>
        </div>
      </div>
    </section>
  )
}
