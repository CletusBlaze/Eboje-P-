import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'
import type { Program } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Explore the programs through which EBOJE P creates meaningful opportunities across Nigeria.',
  alternates: { canonical: `${BASE}/programs` },
  openGraph: {
    title: 'Our Programs | EBOJE P',
    description: 'Explore the programs through which EBOJE P creates meaningful opportunities across Nigeria.',
    url: `${BASE}/programs`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Our Programs | EBOJE P' },
}

async function getPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API}/programs`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <>
      <PageHero
        label="What We Do"
        heading="Creating opportunities where they matter most."
        description="Our programs are designed to address the root causes of inequality — not just the symptoms."
      />

      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <div style={{ maxWidth: '64ch', marginInline: 'auto', textAlign: 'center', marginBottom: 'var(--spacing-section)' }}>
              <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                Every program we run is built around one question: what does this community actually need? We don&apos;t arrive with predetermined solutions. We listen, we learn, and we build together.
              </p>
            </div>
          </SectionReveal>

          {programs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(23,32,29,0.08)', border: '1px solid rgba(23,32,29,0.08)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
              {programs.map((program, i) => (
                <SectionReveal key={program.slug} delay={i * 0.07}>
                  <Link
                    href={`/programs/${program.slug}`}
                    style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '2rem', padding: 'clamp(1.75rem, 3vw, 2.5rem)', backgroundColor: 'var(--color-white)', textDecoration: 'none', transition: 'background-color 300ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-ivory)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-white)')}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--color-gold)', opacity: 0.6, lineHeight: 1, minWidth: '3rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{program.title}</h2>
                      <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '60ch' }}>{program.shortDescription}</p>
                    </div>
                    <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}><ArrowRight size={20} /></span>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Programs coming soon.</p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
