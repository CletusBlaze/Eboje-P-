'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { Donation, PaginatedResponse } from '@/types'

const STATUS_COLOR: Record<string, string> = {
  success: 'text-emerald-400',
  pending: 'text-yellow-400',
  failed:  'text-red-400',
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    api.get<PaginatedResponse<Donation>>('/donations?limit=100', { token: getToken() ?? undefined })
      .then(res => setDonations(res.data))
      .catch(() => null)
  }, [])

  return (
    <AdminTable title="Donations">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Name</th>
            <th className="text-left px-5 py-3">Email</th>
            <th className="text-left px-5 py-3">Amount</th>
            <th className="text-left px-5 py-3">Frequency</th>
            <th className="text-left px-5 py-3">Status</th>
            <th className="text-left px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{d.name}</td>
              <td className="px-5 py-3 text-white/40">{d.email}</td>
              <td className="px-5 py-3">₦{Number(d.amount).toLocaleString()}</td>
              <td className="px-5 py-3 text-white/40 capitalize">{d.frequency}</td>
              <td className="px-5 py-3">
                <span className={`text-xs font-semibold capitalize ${STATUS_COLOR[d.status] ?? ''}`}>
                  {d.status}
                </span>
              </td>
              <td className="px-5 py-3 text-white/40">
                {new Date(d.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {donations.length === 0 && (
            <tr><td colSpan={6} className="px-5 py-8 text-center text-white/30 text-sm">No donations yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
