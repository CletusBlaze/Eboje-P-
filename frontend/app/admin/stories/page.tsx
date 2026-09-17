'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { Story, PaginatedResponse } from '@/types'

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<Story>>('/stories?limit=100&all=true', { token: getToken() ?? undefined })
      setStories(res.data)
    } catch { /* ignore */ }
  }

  async function togglePublish(story: Story) {
    const endpoint = story.isPublished
      ? `/stories/${story.id}/unpublish`
      : `/stories/${story.id}/publish`
    await api.patch(endpoint, {}, { token: getToken() ?? undefined })
    setStories(s => s.map(x => x.id === story.id ? { ...x, isPublished: !x.isPublished } : x))
  }

  async function remove(id: string) {
    if (!confirm('Delete this story?')) return
    await api.delete(`/stories/${id}`, { token: getToken() ?? undefined })
    setStories(s => s.filter(x => x.id !== id))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable
      title="Stories"
      action={
        <Link href="/admin/stories/new" className="btn btn-primary text-xs py-2 px-4">
          + New Story
        </Link>
      }
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Title</th>
            <th className="text-left px-5 py-3">Category</th>
            <th className="text-left px-5 py-3">Published</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {stories.map(s => (
            <tr key={s.id} className="border-b border-white/5 text-white/70 hover:bg-white/5">
              <td className="px-5 py-3">{s.title}</td>
              <td className="px-5 py-3 text-white/40 capitalize">{s.category}</td>
              <td className="px-5 py-3">
                <button
                  onClick={() => togglePublish(s)}
                  className={`text-xs font-semibold ${s.isPublished ? 'text-emerald-400' : 'text-white/30'} hover:underline`}
                >
                  {s.isPublished ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-5 py-3 text-right space-x-3">
                <Link href={`/admin/stories/${s.id}`} className="text-xs text-gold hover:underline">Edit</Link>
                <button onClick={() => remove(s.id)} className="text-xs text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
          {stories.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-white/30 text-sm">No stories yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
