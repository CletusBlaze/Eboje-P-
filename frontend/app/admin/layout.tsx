'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth/adminAuth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login') {
      setReady(true)
      return
    }
    if (!isAuthenticated()) {
      router.replace('/admin/login')
      return
    }
    setReady(true)
  }, [pathname, router])

  if (!ready) return null

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex min-h-screen bg-obsidian">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#0d2820]">
        {children}
      </main>
    </div>
  )
}
