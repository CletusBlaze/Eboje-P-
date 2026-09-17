'use client'

import { useEffect, useState, FormEvent } from 'react'
import Image from 'next/image'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import AdminTable from '@/components/admin/AdminTable'
import { Field, Input } from '@/components/admin/AdminFormFields'
import type { GalleryImage, PaginatedResponse } from '@/types'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState('')
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)

  async function load() {
    try {
      const res = await api.get<PaginatedResponse<GalleryImage>>('/misc/gallery/admin?limit=100', { token: getToken() ?? undefined })
      setImages(res.data)
    } catch { /* ignore */ }
  }

  async function remove(id: string) {
    if (!confirm('Delete this image?')) return
    await api.delete(`/misc/gallery/${id}`, { token: getToken() ?? undefined })
    setImages(g => g.filter(x => x.id !== id))
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!url) return
    setAdding(true)
    try {
      const res = await api.post<{ data: GalleryImage }>('/misc/gallery', { url, caption, category, order: images.length }, { token: getToken() ?? undefined })
      setImages(g => [...g, res.data])
      setUrl(''); setCaption(''); setCategory('')
      setShowForm(false)
    } catch { /* ignore */ }
    finally { setAdding(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <AdminTable
      title="Gallery"
      action={
        <button onClick={() => setShowForm(s => !s)} className="btn btn-primary text-xs py-2 px-4">
          {showForm ? 'Cancel' : '+ Add Image'}
        </button>
      }
    >
      {showForm && (
        <form onSubmit={handleAdd} className="p-5 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Field label="Image URL" required>
            <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." required />
          </Field>
          <Field label="Caption">
            <Input value={caption} onChange={e => setCaption(e.target.value)} />
          </Field>
          <Field label="Category">
            <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. events" />
          </Field>
          <button type="submit" disabled={adding} className="btn btn-primary text-xs py-2 px-4 disabled:opacity-40 sm:col-start-3">
            {adding ? 'Adding…' : 'Add Image'}
          </button>
        </form>
      )}

      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map(img => (
          <div key={img.id} className="relative group aspect-square bg-white/5 rounded-sm overflow-hidden">
            <Image src={img.url} alt={img.caption ?? ''} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => remove(img.id)} className="text-xs text-red-400 font-semibold hover:underline">
                Delete
              </button>
            </div>
            {img.caption && (
              <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white/70 bg-black/50 truncate">
                {img.caption}
              </p>
            )}
          </div>
        ))}
        {images.length === 0 && !showForm && (
          <p className="col-span-full py-8 text-center text-white/30 text-sm">No images yet.</p>
        )}
      </div>
    </AdminTable>
  )
}
