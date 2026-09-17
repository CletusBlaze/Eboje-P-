'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'

interface Stats {
  totalReach: number
  totalProjects: number
  publishedStories: number
  totalDonations: number
  unreadMessages: number
  pendingVolunteers: number
}

const STAT_LABELS: { key: keyof Stats; label: string }[] = [
  { key: 'totalReach',       label: 'People Reached' },
  { key: 'totalProjects',    label: 'Projects' },
  { key: 'publishedStories', label: 'Published Stories' },
  { key: 'totalDonations',   label: 'Total Raised (₦)' },
  { key: 'unreadMessages',   label: 'Unread Messages' },
  { key: 'pendingVolunteers',label: 'Pending Volunteers' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api.get<{ data: Stats }>('/misc/dashboard/stats', { token: getToken() ?? undefined })
      .then(res => setStats(res.data))
      .catch(() => null)
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_LABELS.map(({ key, label }) => (
          <div key={key} className="bg-white/5 border border-white/10 p-5 rounded-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">{label}</p>
            <p className="font-display text-3xl text-white">
              {stats ? (
                key === 'totalDonations'
                  ? `₦${Number(stats[key]).toLocaleString()}`
                  : Number(stats[key]).toLocaleString()
              ) : '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
