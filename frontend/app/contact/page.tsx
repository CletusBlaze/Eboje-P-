import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Eboje P. We would love to hear from you.',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-white)',
  border: '1px solid rgba(23,32,29,0.15)',
  borderRadius: 'var(--radius-button)',
  outline: 'none',
  transition: 'border-color 250ms ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8125rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: 'var(--color-text-primary)',
  marginBottom: '0.5rem',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        heading="We would love to hear from you."
        description="Whether you have a question, a story to share, or just want to learn more — reach out."
      />

      <section style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>

          {/* Contact info */}
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>Contact Eboje P</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-sm)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: '2rem' }}>
              Let's start a conversation.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'hello@ebojep.org', href: 'mailto:hello@ebojep.org' },
                { icon: <Phone size={18} />, label: 'Phone', value: '+234 000 000 0000', href: 'tel:+2340000000000' },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Delta State, Nigeria', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none' }}>
                  <span style={{ color: 'var(--color-gold)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{item.label}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </SectionReveal>

          {/* Form */}
          <SectionReveal delay={0.12}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={labelStyle}>Name</label><input type="text" placeholder="Your name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Email</label><input type="email" placeholder="your@email.com" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Phone (optional)</label><input type="tel" placeholder="+234 000 000 0000" style={inputStyle} /></div>
              <div><label style={labelStyle}>Subject</label><input type="text" placeholder="What is this about?" style={inputStyle} /></div>
              <div><label style={labelStyle}>Message</label><textarea placeholder="Your message..." rows={6} style={{ ...inputStyle, resize: 'vertical' }} /></div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
            </form>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
