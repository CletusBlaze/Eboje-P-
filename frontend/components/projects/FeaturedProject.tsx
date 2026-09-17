'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react'
import { useImageReveal } from '@/hooks/useImageReveal'
import { useFadeUp } from '@/hooks/useFadeUp'
import type { Project } from '@/types'

const FALLBACK: Partial<Project> = {
  slug: 'community-empowerment-initiative',
  title: 'Community Empowerment Initiative',
  shortDescription: 'A multi-year initiative focused on building economic resilience and social infrastructure in underserved communities across Delta State.',
  location: 'Delta State, Nigeria',
  startDate: '2023-01-01',
  featuredImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80',
}

export default function FeaturedProject() {
  const [project, setProject] = useState<Partial<Project>>(FALLBACK)
  const imageRef = useImageReveal<HTMLDivElement>({ start: 'top 70%' })
  const contentRef = useFadeUp<HTMLDivElement>({ y: 36, start: 'top 70%' })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects/featured`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data) setProject(json.data) })
      .catch(() => null)
  }, [])

  return (
    <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
      <div className="container-site">
        <div style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
          <span className="label-section" style={{ display: 'block', marginBottom: '0.75rem' }}>Featured Project</span>
          <span className="gold-line" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2.5rem, 5vw, 5rem)', alignItems: 'center' }}>
          <div ref={imageRef} style={{ position: 'relative', aspectRatio: '16/11', borderRadius: 'var(--radius-card)', overflow: 'hidden', cursor: 'pointer' }}>
            {project.featuredImage && (
              <Image
                src={project.featuredImage}
                alt={project.title ?? 'Featured project'}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 600ms ease' }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
            )}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', backgroundColor: 'rgba(7,27,22,0.85)', backdropFilter: 'blur(8px)', padding: '0.5rem 1rem', borderRadius: '2px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                {project.program?.title ?? 'Featured'}
              </span>
            </div>
          </div>

          <div ref={contentRef}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-sm)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.15, marginBottom: '1.75rem' }}>
              {project.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(23,32,29,0.1)' }}>
              {project.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}><MapPin size={14} /></span>{project.location}
                </div>
              )}
              {project.startDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}><Calendar size={14} /></span>
                  {new Date(project.startDate).getFullYear()} – {project.endDate ? new Date(project.endDate).getFullYear() : 'Ongoing'}
                </div>
              )}
              {project.impactNumbers?.[0] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}><Users size={14} /></span>
                  {project.impactNumbers[0].value.toLocaleString()}+ {project.impactNumbers[0].label}
                </div>
              )}
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '46ch' }}>
              {project.shortDescription}
            </p>

            <Link
              href={`/projects/${project.slug}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-text-primary)', paddingBottom: '2px', transition: 'color 250ms ease, border-color 250ms ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--color-forest)'; el.style.borderColor = 'var(--color-forest)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--color-text-primary)'; el.style.borderColor = 'var(--color-text-primary)' }}
            >
              Explore Project <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
