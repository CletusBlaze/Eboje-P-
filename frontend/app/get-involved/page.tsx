import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/animations/SectionReveal'
import FinalCTA from '@/components/ui/FinalCTA'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Volunteer, partner, or donate to support the work of Eboje P in communities across Nigeria.',
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

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        label="Get Involved"
        heading="There are many ways to make a difference."
        description="Whether you give your time, your skills, or your resources — every contribution matters."
      />

      {/* Volunteer */}
      <section id="volunteer" style={{ backgroundColor: 'var(--color-ivory)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>Volunteer</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Give your skills and time.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: '44ch' }}>
              We welcome volunteers from all backgrounds — teachers, healthcare workers, engineers, communicators, and more. If you have skills and time to give, we have a place for you.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={labelStyle}>Full Name</label><input type="text" placeholder="Your full name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Email</label><input type="email" placeholder="your@email.com" style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={labelStyle}>Phone</label><input type="tel" placeholder="+234 000 000 0000" style={inputStyle} /></div>
                <div><label style={labelStyle}>Location</label><input type="text" placeholder="City, State" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Skills</label><input type="text" placeholder="e.g. Teaching, Healthcare, Engineering" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Area of Interest</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select a program area</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Community Development</option>
                  <option>Empowerment</option>
                  <option>Youth Development</option>
                  <option>Communications & Media</option>
                  <option>Administration</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Availability</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Flexible</option>
                  <option>Full-time</option>
                  <option>Remote only</option>
                </select>
              </div>
              <div><label style={labelStyle}>Message (optional)</label><textarea placeholder="Tell us more about yourself and why you want to volunteer..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Application</button>
            </form>
          </SectionReveal>
        </div>
      </section>

      {/* Partner */}
      <section id="partner" style={{ backgroundColor: 'var(--color-forest)', paddingBlock: 'var(--spacing-section)' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
          <SectionReveal>
            <span className="label-section" style={{ display: 'block', marginBottom: '1.25rem' }}>Partner</span>
            <span className="gold-line" style={{ marginBottom: '1.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-md)', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Build impact with us.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '44ch' }}>
              We partner with organisations, businesses, and institutions that share our commitment to community development. If you want to create meaningful impact at scale, let's talk.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Organisation</label><input type="text" placeholder="Organisation name" style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)' }} /></div>
                <div><label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Contact Person</label><input type="text" placeholder="Full name" style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)' }} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Email</label><input type="email" placeholder="contact@org.com" style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)' }} /></div>
                <div><label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Phone</label><input type="tel" placeholder="+234 000 000 0000" style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)' }} /></div>
              </div>
              <div>
                <label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Partnership Type</label>
                <select style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)', cursor: 'pointer' }}>
                  <option value="">Select partnership type</option>
                  <option>Corporate Social Responsibility</option>
                  <option>Program Funding</option>
                  <option>Technical Partnership</option>
                  <option>Media & Communications</option>
                  <option>Research & Evaluation</option>
                  <option>Other</option>
                </select>
              </div>
              <div><label style={{ ...labelStyle, color: 'rgba(255,255,255,0.8)' }}>Message</label><textarea placeholder="Tell us about your organisation and how you'd like to partner with us..." rows={4} style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-white)', resize: 'vertical' }} /></div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Partnership Enquiry</button>
            </form>
          </SectionReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
