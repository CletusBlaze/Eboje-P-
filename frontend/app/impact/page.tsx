import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'

export const metadata: Metadata = {
  title: 'Impact',
  description: 'See the measurable impact Eboje P has created across communities in Nigeria.',
}

const stats = [
  { value: '12,000+', label: 'People reached' },
  { value: '24', label: 'Communities served' },
  { value: '18', label: 'Active programs' },
  { value: '7', label: 'Years of work' },
  { value: '320', label: 'Businesses supported' },
  { value: '4,200+', label: 'Students supported' },
  { value: '3,200+', label: 'Healthcare beneficiaries' },
  { value: '1,800+', label: 'People trained' },
]

const communities = [
  { name: 'Warri', state: 'Delta State', programs: ['Education', 'Healthcare', 'Youth Development'] },
  { name: 'Ughelli', state: 'Delta State', programs: ['Healthcare', 'Community Development'] },
  { name: 'Asaba', state: 'Delta State', programs: ['Empowerment', 'Education'] },
  { name: 'Sapele', state: 'Delta State', programs: ['Youth Development', 'Community Development'] },
  { name: 'Agbor', state: 'Delta State', programs: ['Education', 'Empowerment'] },
  { name: 'Ozoro', state: 'Delta State', programs: ['Healthcare', 'Community Development'] },
]

export default function ImpactPage() {
  return (
    <>
      <PageHero
        label="Our Impact"
        heading="Numbers that represent real lives."
        description="Every statistic on this page is a person, a family, a community that is better off than before."
      />

      {/* Stats grid */}
      <section style={{ backgroundColor: 'var(--color-obsidian)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '3rem' }}>By the Numbers</span>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem 2rem' }}>
            {stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.07}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--color-white)', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{stat.value}</p>
                  <span className="gold-line" style={{ marginBottom: '0.75rem' }} />
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{stat.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>Communities</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '22ch' }}>
              Where our work is happening.
            </h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {communities.map((community, i) => (
              <SectionReveal key={community.name} delay={i * 0.07}>
                <div style={{ padding: '1.75rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{community.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>{community.state}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {community.programs.map((program) => (
                      <span key={program} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.625rem', backgroundColor: 'rgba(18,60,50,0.08)', color: 'var(--color-forest)', borderRadius: '2px' }}>{program}</span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section style={{ backgroundColor: 'var(--color-forest)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>Reports</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '1.25rem' }}>Transparency matters.</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '52ch', marginBottom: '2.5rem' }}>
              We believe the communities we serve — and the donors who support us — deserve full transparency. Annual reports will be published here as they become available.
            </p>
            <div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-card)', display: 'inline-block' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Annual Report 2024</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>Coming soon</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Stories link */}
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ textAlign: 'center' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1rem' }}>Stories</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Every number has a story.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: '48ch', marginInline: 'auto', marginBottom: '2.5rem' }}>
              Behind every statistic is a real person whose life has changed. Read their stories.
            </p>
            <Link href="/stories" className="btn btn-outline-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Read Stories <ArrowRight size={14} />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
