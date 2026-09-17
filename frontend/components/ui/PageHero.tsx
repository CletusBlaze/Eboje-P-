import Image from 'next/image'
import SectionReveal from '@/components/animations/SectionReveal'

interface PageHeroProps {
  label: string
  heading: string
  description?: string
  image?: string
  imageAlt?: string
  dark?: boolean
}

export default function PageHero({
  label,
  heading,
  description,
  image,
  imageAlt = '',
  dark = true,
}: PageHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: dark ? 'var(--color-obsidian)' : 'var(--color-forest)',
        paddingTop: 'clamp(8rem, 14vw, 12rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background image if provided */}
      {image && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: 'linear-gradient(to bottom, rgba(7,27,22,0.7) 0%, rgba(7,27,22,0.85) 100%)',
            }}
          />
        </>
      )}

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        <SectionReveal>
          <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>
            {label}
          </span>
          <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-display-lg)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: 'var(--color-white)',
              letterSpacing: '-0.02em',
              maxWidth: '20ch',
              marginBottom: description ? '1.5rem' : 0,
            }}
          >
            {heading}
          </h1>
          {description && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '52ch',
              }}
            >
              {description}
            </p>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
