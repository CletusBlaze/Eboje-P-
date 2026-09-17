'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { PartnerApplication, PaginatedResponse } from '@/types'

const STATUSES = ['pending', 'reviewed', 'accepted', 'declined'] as const

const STATUS_COLOR: Record<string, string> = {
  pending:  'text-yellow-400',
  reviewed: 'text-blue-400',
  accepted: 'text-emerald-400',
  declined: 'text-red-400',
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerApplication[]>([])

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<PartnerApplication>>('/misc/partners?limit=100', { token: getToken() ?? undefined })
      setPartners(res.data)
    } catch { /* ignore */ }
  }

  async function updateStatus(id: string, status: string) {
    await api.patch(`/misc/partners/${id}/status`, { status }, { token: getToken() ?? undefined })
    setPartners(p => p.map(x => x.id === id ? { ...x, status: status as PartnerApplication['status'] } : x))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable title="Partner Applications">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Organization</th>
            <th className="text-left px-5 py-3">Contact</th>
            <th className="text-left px-5 py-3">Email</th>
            <th className="text-left px-5 py-3">Type</th>
            <th className="text-left px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(p => (
            <tr key={p.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{p.organization}</td>
              <td className="px-5 py-3 text-white/40">{p.contactPerson}</td>
              <td className="px-5 py-3 text-white/40">{p.email}</td>
              <td className="px-5 py-3 text-white/40">{p.partnershipType}</td>
              <td className="px-5 py-3">
                <select
                  value={p.status ?? 'pending'}
                  onChange={e => updateStatus(p.id!, e.target.value)}
                  className={`bg-transparent text-xs font-semibold border-none outline-none cursor-pointer ${STATUS_COLOR[p.status ?? 'pending']}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="bg-obsidian text-white">{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {partners.length === 0 && (
            <tr><td colSpan={5} className="px-5 py-8 text-center text-white/30 text-sm">No partner applications yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
