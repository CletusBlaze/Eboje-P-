import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'
import type { Project } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API}/projects/${slug}`, { next: { revalidate: 1800 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/projects`, { next: { revalidate: 1800 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((p: Project) => p.slug)
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
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `${BASE}/projects/${slug}` },
    openGraph: {
      title: `${project.title} | EBOJE P`,
      description: project.shortDescription,
      url: `${BASE}/projects/${slug}`,
      images: project.featuredImage ? [{ url: project.featuredImage }] : [{ url: '/og-image.jpg' }],
    },
    twitter: { card: 'summary_large_image', title: project.title, images: project.featuredImage ? [project.featuredImage] : [] },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const contentParagraphs = project.content?.split('\n').filter(Boolean) ?? []

  return (
    <>
      <PageHero
        label={project.program?.title ?? 'Project'}
        heading={project.title}
        description={project.shortDescription}
        image={project.featuredImage}
        imageAlt={project.title}
      />

      <div className="container-site" style={{ paddingTop: '2rem' }}>
        <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
          <ArrowLeft size={14} /> All Projects
        </Link>
      </div>

      {/* Meta bar */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container-site">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(23,32,29,0.1)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
              <MapPin size={14} style={{ color: 'var(--color-gold)' }} />{project.location}
            </span>
            {project.startDate && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                <Calendar size={14} style={{ color: 'var(--color-gold)' }} />
                {new Date(project.startDate).getFullYear()}{project.endDate ? ` – ${new Date(project.endDate).getFullYear()}` : ' – Ongoing'}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: '2px', backgroundColor: 'rgba(198,161,91,0.15)', color: '#8B6914' }}>
              {project.status}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      {contentParagraphs.length > 0 && (
        <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
          <div className="container-site" style={{ maxWidth: '72ch' }}>
            {contentParagraphs.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{p}</p>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
          <div className="container-site">
            <SectionReveal>
              <span className="label-section" style={{ display: 'block', marginBottom: '2rem' }}>Gallery</span>
            </SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {project.gallery.map((img, i) => (
                <SectionReveal key={img.id} delay={i * 0.08}>
                  <div style={{ position: 'relative', aspectRatio: i % 3 === 0 ? '4/3' : '1/1', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
                    <Image src={img.url} alt={img.caption ?? `${project.title} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  )
}
