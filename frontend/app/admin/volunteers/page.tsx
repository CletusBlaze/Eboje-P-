'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { VolunteerApplication, PaginatedResponse } from '@/types'

const STATUSES = ['pending', 'reviewed', 'accepted', 'declined'] as const

const STATUS_COLOR: Record<string, string> = {
  pending:  'text-yellow-400',
  reviewed: 'text-blue-400',
  accepted: 'text-emerald-400',
  declined: 'text-red-400',
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([])

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<VolunteerApplication>>('/misc/volunteers?limit=100', { token: getToken() ?? undefined })
      setVolunteers(res.data)
    } catch { /* ignore */ }
  }

  async function updateStatus(id: string, status: string) {
    await api.patch(`/misc/volunteers/${id}/status`, { status }, { token: getToken() ?? undefined })
    setVolunteers(v => v.map(x => x.id === id ? { ...x, status: status as VolunteerApplication['status'] } : x))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable title="Volunteers">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Name</th>
            <th className="text-left px-5 py-3">Email</th>
            <th className="text-left px-5 py-3">Area</th>
            <th className="text-left px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(v => (
            <tr key={v.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{v.fullName}</td>
              <td className="px-5 py-3 text-white/40">{v.email}</td>
              <td className="px-5 py-3 text-white/40">{v.areaOfInterest}</td>
              <td className="px-5 py-3">
                <select
                  value={v.status ?? 'pending'}
                  onChange={e => updateStatus(v.id!, e.target.value)}
                  className={`bg-transparent text-xs font-semibold border-none outline-none cursor-pointer ${STATUS_COLOR[v.status ?? 'pending']}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="bg-obsidian text-white">{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {volunteers.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-white/30 text-sm">No applications yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
