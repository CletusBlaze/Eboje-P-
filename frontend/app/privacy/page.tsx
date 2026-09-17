import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Eboje P.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" heading="Privacy Policy." />
      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site">
          <SectionReveal>
            <div style={{ maxWidth: '68ch' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                This privacy policy explains how Eboje P collects, uses, and protects information provided through this website.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                Full privacy policy content will be published here. For questions, contact us at hello@ebojep.org.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
