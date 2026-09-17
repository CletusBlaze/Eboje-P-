'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import { Field, Input, Textarea, Checkbox } from '@/components/admin/AdminFormFields'
import type { Program } from '@/types'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProgramForm({ program }: { program?: Program }) {
  const router = useRouter()
  const isEdit = !!program

  const [title, setTitle]               = useState(program?.title ?? '')
  const [slug, setSlug]                 = useState(program?.slug ?? '')
  const [shortDescription, setShort]    = useState(program?.shortDescription ?? '')
  const [description, setDescription]   = useState(program?.description ?? '')
  const [icon, setIcon]                 = useState(program?.icon ?? '')
  const [featuredImage, setImage]       = useState(program?.featuredImage ?? '')
  const [order, setOrder]               = useState(program?.order ?? 0)
  const [isActive, setActive]           = useState(program?.isActive ?? true)
  const [error, setError]               = useState('')
  const [saving, setSaving]             = useState(false)

  // Auto-slug from title on create
  useEffect(() => {
    if (!isEdit) setSlug(slugify(title))
  }, [title, isEdit])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const body = { title, slug, shortDescription, description, icon, featuredImage, order, isActive }
      if (isEdit) {
        await api.put(`/programs/${program.id}`, body, { token: getToken() ?? undefined })
      } else {
        await api.post('/programs', body, { token: getToken() ?? undefined })
      }
      router.push('/admin/programs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl text-white mb-8">
        {isEdit ? 'Edit Program' : 'New Program'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" required>
          <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </Field>

        <Field label="Slug" required hint="Auto-generated from title. Edit if needed.">
          <Input value={slug} onChange={e => setSlug(e.target.value)} required />
        </Field>

        <Field label="Short Description" required hint="Used in cards and previews.">
          <Textarea value={shortDescription} onChange={e => setShort(e.target.value)} rows={2} required />
        </Field>

        <Field label="Full Description" required>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Icon" hint="Emoji or icon name">
            <Input value={icon} onChange={e => setIcon(e.target.value)} placeholder="e.g. 📚" />
          </Field>
          <Field label="Order" hint="Display order (lower = first)">
            <Input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} min={0} />
          </Field>
        </div>

        <Field label="Featured Image URL" hint="Supabase storage URL or Unsplash URL">
          <Input value={featuredImage} onChange={e => setImage(e.target.value)} placeholder="https://..." />
        </Field>

        <Checkbox label="Active (visible on public site)" checked={isActive} onChange={e => setActive(e.target.checked)} />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-40">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Program'}
          </button>
          <button type="button" onClick={() => router.push('/admin/programs')} className="btn btn-outline-light">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
