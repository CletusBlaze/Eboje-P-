import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import type { Story } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Impact stories, news, and updates from EBOJE P and the communities we serve.',
  alternates: { canonical: `${BASE}/stories` },
  openGraph: {
    title: 'Stories | EBOJE P',
    description: 'Impact stories, news, and updates from EBOJE P and the communities we serve.',
    url: `${BASE}/stories`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Stories | EBOJE P' },
}

async function getStories(): Promise<Story[]> {
  try {
    const res = await fetch(`${API}/stories`, { next: { revalidate: 1800 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

const CATEGORIES = ['All', 'Impact', 'News', 'Events', 'Updates', 'Announcements']

export default async function StoriesPage() {
  const stories = await getStories()
  const featured = stories.find(s => s.isPublished)
  const rest = stories.filter(s => s !== featured)

  return (
    <>
      <PageHero label="Stories" heading="Every number has a story." description="Impact stories, news, events, and updates from EBOJE P and the communities we serve." />

      {/* Category tabs */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingTop: '3rem' }}>
        <div className="container-site">
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(23,32,29,0.1)' }}>
            {CATEGORIES.map((cat, i) => (
              <span key={cat} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.75rem 1.25rem', cursor: 'pointer', color: i === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', borderBottom: i === 0 ? '2px solid var(--color-gold)' : '2px solid transparent' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          {stories.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Stories coming soon.</p>
          )}

          {/* Featured */}
          {featured && (
            <SectionReveal>
              <Link href={`/stories/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)', textDecoration: 'none' }}>
                {featured.featuredImage && (
                  <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
                    <Image src={featured.featuredImage} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', backgroundColor: 'var(--color-gold)', padding: '0.25rem 0.75rem', borderRadius: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-obsidian)' }}>Featured</span>
                    </div>
                  </div>
                )}
                <div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem' }}>{featured.category}</span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-sm)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.15, marginBottom: '1rem' }}>{featured.title}</h2>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '48ch' }}>{featured.excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-text-primary)', paddingBottom: '2px' }}>
                    Read story <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {rest.map((story, i) => (
                <SectionReveal key={story.slug} delay={i * 0.07}>
                  <Link href={`/stories/${story.slug}`} style={{ display: 'block', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', textDecoration: 'none', transition: 'box-shadow 300ms ease, transform 300ms ease', height: '100%' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-card-hover)'; el.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-card)'; el.style.transform = 'translateY(0)' }}
                  >
                    {story.featuredImage && (
                      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                        <Image src={story.featuredImage} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>{story.category}</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) : ''}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.3, marginBottom: '0.75rem' }}>{story.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>{story.excerpt}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                        Read story <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
