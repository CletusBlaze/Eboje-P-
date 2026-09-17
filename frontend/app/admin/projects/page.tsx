'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { Project, PaginatedResponse } from '@/types'

const STATUS_COLOR: Record<string, string> = {
  ongoing:   'text-emerald-400',
  completed: 'text-blue-400',
  upcoming:  'text-yellow-400',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<Project>>('/projects?limit=100', { token: getToken() ?? undefined })
      setProjects(res.data)
    } catch { /* ignore */ }
  }

  async function remove(id: string) {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`, { token: getToken() ?? undefined })
    setProjects(p => p.filter(x => x.id !== id))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable
      title="Projects"
      action={
        <Link href="/admin/projects/new" className="btn btn-primary text-xs py-2 px-4">
          + New Project
        </Link>
      }
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Title</th>
            <th className="text-left px-5 py-3">Location</th>
            <th className="text-left px-5 py-3">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{p.title}</td>
              <td className="px-5 py-3 text-white/40">{p.location}</td>
              <td className="px-5 py-3">
                <span className={`text-xs font-semibold capitalize ${STATUS_COLOR[p.status] ?? ''}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-5 py-3 text-right space-x-3">
                <Link href={`/admin/projects/${p.id}`} className="text-xs text-gold hover:underline">Edit</Link>
                <button onClick={() => remove(p.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-white/30 text-sm">No projects yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
