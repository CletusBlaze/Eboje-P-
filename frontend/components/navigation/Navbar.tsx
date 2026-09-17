'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our Work', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Stories', href: '/stories' },
  { label: 'Get Involved', href: '/get-involved' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)',
          transition: 'background-color 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease',
          backgroundColor: scrolled ? 'rgba(7, 27, 22, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(198, 161, 91, 0.12)' : '1px solid transparent',
        }}
      >
        <div
          className="container-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '4.5rem' : '5.5rem',
            transition: 'height 400ms ease',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.375rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--color-white)',
              textDecoration: 'none',
            }}
          >
            EBOJE P
          </Link>

          {/* Desktop nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: active ? 'var(--color-gold)' : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 250ms ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'var(--color-gold)',
                      }}
                    />
                  )}
                </Link>
              )
            })}

            <Link href="/donate" className="btn btn-primary" style={{ padding: '0.625rem 1.5rem' }}>
              Donate
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: i === 1 ? '1.25rem' : '1.75rem',
                  height: '1.5px',
                  backgroundColor: 'var(--color-white)',
                  transition: 'width 250ms ease',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      <MobileMenu
        links={navLinks}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
