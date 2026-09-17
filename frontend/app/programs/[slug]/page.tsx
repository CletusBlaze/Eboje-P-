import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'
import type { Program } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

async function getProgram(slug: string): Promise<Program | null> {
  try {
    const res = await fetch(`${API}/programs/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/programs`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((p: Program) => p.slug)
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgram(slug)
  if (!program) return {}
  return {
    title: program.title,
    description: program.shortDescription,
    alternates: { canonical: `${BASE}/programs/${slug}` },
    openGraph: {
      title: `${program.title} | EBOJE P`,
      description: program.shortDescription,
      url: `${BASE}/programs/${slug}`,
      images: program.featuredImage ? [{ url: program.featuredImage }] : [{ url: '/og-image.jpg' }],
    },
    twitter: { card: 'summary_large_image', title: program.title },
  }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = await getProgram(slug)
  if (!program) notFound()

  // Parse description as sections if it contains newlines, else show as single block
  const paragraphs = program.description.split('\n').filter(Boolean)

  return (
    <>
      <PageHero
        label="Program"
        heading={program.title}
        description={program.shortDescription}
        image={program.featuredImage}
        imageAlt={program.title}
      />

      <div className="container-site" style={{ paddingTop: '2rem' }}>
        <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
          <ArrowLeft size={14} /> All Programs
        </Link>
      </div>

      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ maxWidth: '72ch' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>About This Program</span>
            <span className="gold-line" style={{ marginBottom: '2rem' }} />
          </SectionReveal>
          {paragraphs.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{p}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
