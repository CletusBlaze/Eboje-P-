'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import type { ContactMessage, PaginatedResponse } from '@/types'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<ContactMessage>>('/misc/messages?limit=100', { token: getToken() ?? undefined })
      setMessages(res.data)
    } catch { /* ignore */ }
  }

  async function markRead(id: string) {
    await api.patch(`/misc/messages/${id}/read`, {}, { token: getToken() ?? undefined })
    setMessages(m => m.map(x => x.id === id ? { ...x, isRead: true } : x))
  }

  function toggle(id: string) {
    setExpanded(e => e === id ? null : id)
    const msg = messages.find(m => m.id === id)
    if (msg && !msg.isRead) markRead(id)
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable title="Messages">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="text-left px-5 py-3">Name</th>
            <th className="text-left px-5 py-3">Subject</th>
            <th className="text-left px-5 py-3">Email</th>
            <th className="text-left px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(m => (
            <>
              <tr
                key={m.id}
                onClick={() => toggle(m.id!)}
                className={`border-b border-white/5 cursor-pointer hover:bg-white/5 ${!m.isRead ? 'text-white' : 'text-white/50'}`}
              >
                <td className="px-5 py-3 flex items-center gap-2">
                  {!m.isRead && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  {m.name}
                </td>
                <td className="px-5 py-3">{m.subject}</td>
                <td className="px-5 py-3 text-white/40">{m.email}</td>
                <td className="px-5 py-3 text-white/40">
                  {new Date(m.createdAt!).toLocaleDateString()}
                </td>
              </tr>
              {expanded === m.id && (
                <tr key={`${m.id}-body`} className="border-b border-white/5 bg-white/3">
                  <td colSpan={4} className="px-5 py-4 text-white/60 text-sm leading-relaxed">
                    {m.message}
                  </td>
                </tr>
              )}
            </>
          ))}
          {messages.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-white/30 text-sm">No messages yet.</td></tr>
          )}
        </tbody>
      </table>
    </AdminTable>
  )
}
