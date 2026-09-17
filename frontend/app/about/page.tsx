import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about EBOJE P — our story, mission, vision, and the values that drive our work across Nigeria.',
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: 'About EBOJE P',
    description: 'Learn about EBOJE P — our story, mission, vision, and the values that drive our work across Nigeria.',
    url: `${BASE}/about`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EBOJE P',
    description: 'Learn about EBOJE P — our story, mission, vision, and the values that drive our work across Nigeria.',
  },
}

const values = [
  { title: 'Integrity', description: 'We are honest and transparent in everything we do.' },
  { title: 'Compassion', description: 'We lead with empathy and genuine care for people.' },
  { title: 'Excellence', description: 'We hold ourselves to the highest standards of quality.' },
  { title: 'Empowerment', description: 'We build capacity, not dependency.' },
  { title: 'Sustainability', description: 'We create solutions that outlast our involvement.' },
  { title: 'Accountability', description: 'We answer to the communities we serve.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Eboje P"
        heading="Purpose that moves people."
        description="We are a nonprofit organization committed to creating meaningful opportunities and lasting impact in communities across Nigeria."
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1800&q=80"
        imageAlt="Eboje P community work"
      />

      {/* Who We Are */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>Who We Are</span>
            <span className="gold-line" style={{ marginBottom: '2rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, lineHeight: 1.1, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
              Built on the belief that every community deserves better.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '1rem', maxWidth: '52ch' }}>
              Eboje P was founded on a simple but powerful conviction: that geography should not determine destiny. Too many communities across Nigeria have been left behind — not because of a lack of potential, but because of a lack of access.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: '52ch' }}>
              We exist to change that. Through education, healthcare, community development, empowerment, and youth programs, we work alongside communities to build solutions that last.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=80" alt="Community work" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '4rem', height: '4rem', borderRight: '2px solid var(--color-gold)', borderBottom: '2px solid var(--color-gold)' }} />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Mission + Vision */}
      <section style={{ backgroundColor: 'var(--color-obsidian)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {[
            {
              label: 'Our Mission',
              heading: 'Creating opportunities where they matter most.',
              body: 'To empower underserved communities across Nigeria through sustainable programs in education, healthcare, economic development, and social infrastructure.',
            },
            {
              label: 'Our Vision',
              heading: 'A Nigeria where potential is never wasted.',
              body: 'We envision a future where every Nigerian — regardless of where they were born — has access to the tools, resources, and opportunities needed to build a meaningful life.',
            },
          ].map((item) => (
            <SectionReveal key={item.label}>
              <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>{item.label}</span>
              <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-sm)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                {item.heading}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '48ch' }}>{item.body}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>Core Values</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '22ch' }}>
              What drives everything we do.
            </h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((value, i) => (
              <SectionReveal key={value.title} delay={i * 0.08}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', height: '100%' }}>
                  <span className="gold-line" style={{ marginBottom: '1.25rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>{value.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{value.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section style={{ backgroundColor: 'var(--color-forest)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>Where We Work</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Rooted in Nigeria. Growing across communities.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', maxWidth: '48ch' }}>
              Our work is currently concentrated in Delta State, with programs reaching communities in Warri, Ughelli, Asaba, and surrounding areas.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '48ch' }}>
              As we grow, we are expanding our reach to other states across Nigeria — always guided by where the need is greatest.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['Delta State', 'Warri', 'Ughelli', 'Asaba'].map((location) => (
                <div key={location} style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-card)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="gold-line" style={{ marginBottom: '0.75rem' }} />
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-white)' }}>{location}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
