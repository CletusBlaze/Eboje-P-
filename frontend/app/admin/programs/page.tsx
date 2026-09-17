'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { Program, PaginatedResponse } from '@/types'

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<Program>>('/programs?limit=100', { token: getToken() ?? undefined })
      setPrograms(res.data)
    } catch { /* ignore */ }
  }

  async function remove(id: string) {
    if (!confirm('Delete this program?')) return
    await api.delete(`/programs/${id}`, { token: getToken() ?? undefined })
    setPrograms(p => p.filter(x => x.id !== id))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable
      title="Programs"
      action={
        <Link href="/admin/programs/new" className="btn btn-primary text-xs py-2 px-4">
          + New Program
        </Link>
      }
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Title</th>
            <th className="text-left px-5 py-3">Slug</th>
            <th className="text-left px-5 py-3">Active</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {programs.map(p => (
            <tr key={p.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{p.title}</td>
              <td className="px-5 py-3 text-white/40">{p.slug}</td>
              <td className="px-5 py-3">
                <span className={`text-xs font-semibold ${p.isActive ? 'text-emerald-400' : 'text-white/30'}`}>
                  {p.isActive ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-5 py-3 text-right space-x-3">
                <Link href={`/admin/programs/${p.id}`} className="text-xs text-gold hover:underline">Edit</Link>
                <button onClick={() => remove(p.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
          {programs.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-white/30 text-sm">No programs yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
