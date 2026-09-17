'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { removeToken } from '@/lib/auth/adminAuth'

const NAV = [
  { href: '/admin/dashboard',  label: 'Dashboard' },
  { href: '/admin/programs',   label: 'Programs' },
  { href: '/admin/projects',   label: 'Projects' },
  { href: '/admin/stories',    label: 'Stories' },
  { href: '/admin/gallery',    label: 'Gallery' },
  { href: '/admin/volunteers', label: 'Volunteers' },
  { href: '/admin/partners',   label: 'Partners' },
  { href: '/admin/donations',  label: 'Donations' },
  { href: '/admin/messages',   label: 'Messages' },
  { href: '/admin/settings',   label: 'Settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function logout() {
    removeToken()
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 min-h-screen surface-dark flex flex-col border-r border-white/5 shrink-0">
      <div className="px-6 py-8 border-b border-white/5">
        <Link href="/admin/dashboard">
          <span className="label-section block">Admin</span>
          <span className="font-display text-xl text-white">EBOJE P</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-0.5">
        {NAV.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-6 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full text-left px-3 py-2.5 text-sm text-white/40 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
