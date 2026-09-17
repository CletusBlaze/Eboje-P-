import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'
import type { Story } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'
const API  = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000/api'

async function getStory(slug: string): Promise<Story | null> {
  try {
    const res = await fetch(`${API}/stories/${slug}`, { next: { revalidate: 1800 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/stories`, { next: { revalidate: 1800 } })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((s: Story) => s.slug)
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
  const story = await getStory(slug)
  if (!story) return {}
  const title = story.seoTitle || story.title
  const description = story.seoDescription || story.excerpt
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/stories/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/stories/${slug}`,
      type: 'article',
      publishedTime: story.publishedAt,
      authors: [story.author],
      images: story.featuredImage ? [{ url: story.featuredImage }] : [{ url: '/og-image.jpg' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: story.featuredImage ? [story.featuredImage] : [] },
  }
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) notFound()

  const paragraphs = story.content.split('\n').filter(Boolean)

  return (
    <>
      {/* Hero image */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 50vw, 560px)', backgroundColor: 'var(--color-obsidian)' }}>
        {story.featuredImage && (
          <Image src={story.featuredImage} alt={story.title} fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,27,22,0.3) 0%, rgba(7,27,22,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}>
          <div className="container-site">
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.75rem' }}>{story.category}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1, maxWidth: '24ch' }}>{story.title}</h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <div style={{ maxWidth: '68ch', marginInline: 'auto' }}>
            {/* Back + meta */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(23,32,29,0.1)' }}>
              <Link href="/stories" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                <ArrowLeft size={14} /> All Stories
              </Link>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{story.author}</span>
                {story.publishedAt && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {new Date(story.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <SectionReveal>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-primary)', marginBottom: '2.5rem', fontStyle: 'italic' }}>
                {story.excerpt}
              </p>
            </SectionReveal>

            {/* Body */}
            {paragraphs.map((paragraph, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{paragraph}</p>
              </SectionReveal>
            ))}

            {/* Footer */}
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(23,32,29,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Share this story</span>
              <Link href="/stories" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-text-primary)', paddingBottom: '2px' }}>
                More Stories <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
