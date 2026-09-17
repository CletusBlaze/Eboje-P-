import Link from 'next/link'

const footerLinks = {
  explore: [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/programs' },
    { label: 'Impact', href: '/impact' },
    { label: 'Stories', href: '/stories' },
  ],
  getInvolved: [
    { label: 'Donate', href: '/donate' },
    { label: 'Volunteer', href: '/get-involved#volunteer' },
    { label: 'Partner', href: '/get-involved#partner' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Safeguarding', href: '/safeguarding' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-obsidian)',
        color: 'var(--color-white)',
        paddingBlock: 'clamp(4rem, 8vw, 6rem)',
        borderTop: '1px solid rgba(198, 161, 91, 0.12)',
      }}
    >
      <div className="container-site">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--color-white)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              EBOJE P
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '22rem',
              }}
            >
              Creating meaningful opportunities
              <br />and lasting impact.
            </p>

            {/* Social links — placeholders until NGO provides handles */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem' }}>
              {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    transition: 'color 250ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={footerLinks.explore} />

          {/* Get Involved */}
          <FooterColumn title="Get Involved" links={footerLinks.getInvolved} />

          {/* Contact */}
          <div>
            <p className="label-section" style={{ marginBottom: '1.25rem' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: 'hello@ebojep.org', href: 'mailto:hello@ebojep.org' },
                { label: '+234 000 000 0000', href: 'tel:+2340000000000' },
                { label: 'Nigeria', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 250ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © 2026 Eboje P. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'color 250ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="label-section" style={{ marginBottom: '1.25rem' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              transition: 'color 250ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
