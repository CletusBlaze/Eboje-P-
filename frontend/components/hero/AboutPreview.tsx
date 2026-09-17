'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useImageReveal } from '@/hooks/useImageReveal'
import { useFadeUp } from '@/hooks/useFadeUp'

export default function AboutPreview() {
  const imageRef = useImageReveal<HTMLDivElement>()
  const contentRef = useFadeUp<HTMLDivElement>({ y: 40, start: 'top 75%' })

  return (
    <section
      style={{
        backgroundColor: 'var(--color-ivory)',
        paddingBlock: 'var(--spacing-section)',
      }}
    >
      <div
        className="container-site"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* Image */}
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=80"
            alt="Eboje P community work"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              width: '4rem',
              height: '4rem',
              borderRight: '2px solid var(--color-gold)',
              borderBottom: '2px solid var(--color-gold)',
            }}
          />
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Who We Are
          </span>

          <span className="gold-line" style={{ marginBottom: '2rem' }} />

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-display-md)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--color-text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            Purpose that moves people.
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '1rem',
              maxWidth: '48ch',
            }}
          >
            Eboje P is a nonprofit organization committed to creating
            meaningful opportunities in underserved communities across Nigeria.
            We believe that every person deserves access to education,
            healthcare, and the tools to build a better life.
          </p>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '48ch',
            }}
          >
            Through our programs, we work alongside communities — not above
            them — to build solutions that last.
          </p>

          <Link href="/about" className="btn btn-outline-dark">
            Discover Eboje P
          </Link>
        </div>
      </div>
    </section>
  )
}
