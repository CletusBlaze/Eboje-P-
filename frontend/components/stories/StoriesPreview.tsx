'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import type { Story } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const FALLBACK: Story[] = [
  { id: '1', slug: 'how-education-changed-a-community', category: 'impact', title: 'How access to education changed an entire community', excerpt: "When a school was built in Ughelli, it didn't just give children a classroom — it gave a community a future.", author: 'EBOJE P Team', publishedAt: '2024-03-01', isPublished: true, content: '', createdAt: '', updatedAt: '', featuredImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=75' },
  { id: '2', slug: 'women-empowerment-program-results', category: 'impact', title: 'Women-led businesses: one year after our empowerment program', excerpt: 'Twelve months after completing the program, 84% of participants reported increased household income.', author: 'EBOJE P Team', publishedAt: '2024-02-01', isPublished: true, content: '', createdAt: '', updatedAt: '', featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=75' },
  { id: '3', slug: 'healthcare-outreach-2024', category: 'news', title: 'Our 2024 healthcare outreach reached 3,200 people in 6 weeks', excerpt: 'Free screenings, consultations, and medication reached communities that had never seen a doctor.', author: 'EBOJE P Team', publishedAt: '2024-01-01', isPublished: true, content: '', createdAt: '', updatedAt: '', featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=75' },
]

export default function StoriesPreview() {
  const [stories, setStories] = useState<Story[]>(FALLBACK)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/stories?limit=3`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data?.length) setStories(json.data.slice(0, 3)) })
      .catch(() => null)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [stories])

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--color-obsidian)', paddingBlock: 'var(--spacing-section)' }}>
      <div className="container-site">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <div>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>Stories</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1 }}>
              Every number has a story.
            </h2>
          </div>
          <Link href="/stories" className="btn btn-outline-light" style={{ flexShrink: 0 }}>All Stories</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {stories.map((story, i) => (
            <div key={story.slug} ref={el => { cardsRef.current[i] = el }} style={{ opacity: 0 }}>
              <Link
                href={`/stories/${story.slug}`}
                style={{ display: 'block', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-card)', overflow: 'hidden', transition: 'border-color 300ms ease, background-color 300ms ease', textDecoration: 'none', height: '100%' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(198,161,91,0.3)'; el.style.backgroundColor = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
              >
                {story.featuredImage && (
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <Image src={story.featuredImage} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', transition: 'transform 500ms ease' }}
                      onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                      onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>{story.category}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                      {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.3, marginBottom: '0.75rem' }}>{story.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>{story.excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                    Read story <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
