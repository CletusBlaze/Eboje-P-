import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'
import type { Project } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the projects through which EBOJE P is creating lasting change in communities across Nigeria.',
  alternates: { canonical: `${BASE}/projects` },
  openGraph: {
    title: 'Projects | EBOJE P',
    description: 'Explore the projects through which EBOJE P is creating lasting change in communities across Nigeria.',
    url: `${BASE}/projects`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Projects | EBOJE P' },
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API}/projects`, { next: { revalidate: 1800 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

const statusColors: Record<string, { bg: string; text: string }> = {
  ongoing:   { bg: 'rgba(18,60,50,0.15)',   text: 'var(--color-forest)' },
  completed: { bg: 'rgba(198,161,91,0.15)', text: '#8B6914' },
  upcoming:  { bg: 'rgba(7,27,22,0.08)',    text: 'var(--color-text-secondary)' },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero
        label="Projects"
        heading="Where our work takes shape."
        description="Each project is a commitment — to a community, to a goal, and to measurable change."
      />

      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          {projects.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {projects.map((project, i) => (
                <SectionReveal key={project.slug} delay={i * 0.07}>
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{ display: 'block', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', textDecoration: 'none', transition: 'box-shadow 300ms ease, transform 300ms ease', height: '100%' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-card-hover)'; el.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-card)'; el.style.transform = 'translateY(0)' }}
                  >
                    {project.featuredImage && (
                      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                        <Image src={project.featuredImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                    <div style={{ padding: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.program && (
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                            {project.program.title}
                          </span>
                        )}
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.625rem', borderRadius: '2px', backgroundColor: statusColors[project.status]?.bg, color: statusColors[project.status]?.text }}>
                          {project.status}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.25, marginBottom: '0.75rem' }}>{project.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>{project.shortDescription}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                          <MapPin size={13} />{project.location}
                        </span>
                        <span style={{ color: 'var(--color-gold)' }}><ArrowRight size={16} /></span>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Projects coming soon.</p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
