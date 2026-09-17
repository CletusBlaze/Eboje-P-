'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useFadeUp } from '@/hooks/useFadeUp'
import type { Program } from '@/types'

const FALLBACK: Program[] = [
  { id: '1', slug: 'education',          title: 'Education',          shortDescription: 'Expanding access to quality education and learning resources for children and young people.', description: '', order: 1, isActive: true, createdAt: '', updatedAt: '' },
  { id: '2', slug: 'community-development', title: 'Community Development', shortDescription: 'Building stronger, more resilient communities through infrastructure and local leadership.', description: '', order: 2, isActive: true, createdAt: '', updatedAt: '' },
  { id: '3', slug: 'healthcare',          title: 'Healthcare',          shortDescription: 'Improving access to essential health services and promoting community wellbeing.', description: '', order: 3, isActive: true, createdAt: '', updatedAt: '' },
  { id: '4', slug: 'empowerment',         title: 'Empowerment',         shortDescription: 'Equipping individuals with skills, resources, and opportunities to achieve independence.', description: '', order: 4, isActive: true, createdAt: '', updatedAt: '' },
  { id: '5', slug: 'youth-development',   title: 'Youth Development',   shortDescription: 'Investing in the next generation through mentorship, training, and opportunity.', description: '', order: 5, isActive: true, createdAt: '', updatedAt: '' },
]

export default function ProgramsPreview() {
  const [programs, setPrograms] = useState<Program[]>(FALLBACK)
  const sectionRef = useFadeUp<HTMLElement>({ stagger: 0.1, y: 40 }, '.program-card')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/programs`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data?.length) setPrograms(json.data) })
      .catch(() => null)
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-forest)', paddingBlock: 'var(--spacing-section)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>What We Do</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1, maxWidth: '22ch' }}>
              Creating opportunities where they matter most.
            </h2>
          </div>
          <Link href="/programs" className="btn btn-outline-light" style={{ flexShrink: 0 }}>All Programs</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
          {programs.map((program, i) => (
            <div key={program.slug} className="program-card" style={{ opacity: 0 }}>
              <Link
                href={`/programs/${program.slug}`}
                style={{ display: 'block', padding: 'clamp(1.75rem, 3vw, 2.5rem)', backgroundColor: 'rgba(7,27,22,0.4)', height: '100%', transition: 'background-color 300ms ease', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(7,27,22,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(7,27,22,0.4)')}
              >
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1, marginBottom: '1.25rem', opacity: 0.7 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-white)', marginBottom: '0.875rem', lineHeight: 1.2 }}>{program.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>{program.shortDescription}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
