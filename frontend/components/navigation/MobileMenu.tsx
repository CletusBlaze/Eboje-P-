'use client'

import Link from 'next/link'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
  pathname: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.07,
      delayChildren: 0.1,
    } as never,
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } as never },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as never },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

export default function MobileMenu({ links, isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'calc(var(--z-nav) + 10)',
            backgroundColor: 'var(--color-obsidian)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem var(--spacing-container)',
          }}
        >
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <Link
              href="/"
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--color-white)',
              }}
            >
              EBOJE P
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-white)',
                padding: '0.5rem',
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.25rem' }}>
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color: active ? 'var(--color-gold)' : 'var(--color-white)',
                      paddingBlock: '0.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      transition: 'color 250ms ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}

            <motion.div variants={linkVariants} style={{ marginTop: '2rem' }}>
              <Link href="/donate" className="btn btn-primary">
                Donate
              </Link>
            </motion.div>
          </nav>

          {/* Bottom */}
          <motion.div
            variants={linkVariants}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
            }}
          >
            © 2026 Eboje P
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
