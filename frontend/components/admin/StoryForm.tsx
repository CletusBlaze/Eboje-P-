'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import { Field, Input, Textarea, Select, Checkbox } from '@/components/admin/AdminFormFields'
import type { Story } from '@/types'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const CATEGORY_OPTIONS = [
  { value: 'impact',        label: 'Impact' },
  { value: 'news',          label: 'News' },
  { value: 'events',        label: 'Events' },
  { value: 'updates',       label: 'Updates' },
  { value: 'announcements', label: 'Announcements' },
]

export default function StoryForm({ story }: { story?: Story }) {
  const router = useRouter()
  const isEdit = !!story

  const [title, setTitle]             = useState(story?.title ?? '')
  const [slug, setSlug]               = useState(story?.slug ?? '')
  const [excerpt, setExcerpt]         = useState(story?.excerpt ?? '')
  const [content, setContent]         = useState(story?.content ?? '')
  const [author, setAuthor]           = useState(story?.author ?? 'EBOJE P Team')
  const [category, setCategory]       = useState(story?.category ?? 'impact')
  const [featuredImage, setImage]     = useState(story?.featuredImage ?? '')
  const [isPublished, setPublished]   = useState(story?.isPublished ?? false)
  const [seoTitle, setSeoTitle]       = useState(story?.seoTitle ?? '')
  const [seoDescription, setSeoDesc]  = useState(story?.seoDescription ?? '')
  const [error, setError]             = useState('')
  const [saving, setSaving]           = useState(false)

  useEffect(() => {
    if (!isEdit) setSlug(slugify(title))
  }, [title, isEdit])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const body = { title, slug, excerpt, content, author, category, featuredImage, isPublished, seoTitle: seoTitle || null, seoDescription: seoDescription || null }
      if (isEdit) {
        await api.put(`/stories/${story.id}`, body, { token: getToken() ?? undefined })
      } else {
        await api.post('/stories', body, { token: getToken() ?? undefined })
      }
      router.push('/admin/stories')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl text-white mb-8">
        {isEdit ? 'Edit Story' : 'New Story'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" required>
          <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </Field>

        <Field label="Slug" required>
          <Input value={slug} onChange={e => setSlug(e.target.value)} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Author" required>
            <Input value={author} onChange={e => setAuthor(e.target.value)} required />
          </Field>
          <Field label="Category" required>
            <Select value={category} onChange={e => setCategory(e.target.value)} options={CATEGORY_OPTIONS} />
          </Field>
        </div>

        <Field label="Excerpt" required hint="Short summary shown in cards and previews.">
          <Textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} required />
        </Field>

        <Field label="Content" required hint="Full article body. Each paragraph on a new line.">
          <Textarea value={content} onChange={e => setContent(e.target.value)} rows={10} required />
        </Field>

        <Field label="Featured Image URL">
          <Input value={featuredImage} onChange={e => setImage(e.target.value)} placeholder="https://..." />
        </Field>

        <div className="border-t border-white/10 pt-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30">SEO (optional)</p>
          <Field label="SEO Title" hint="Defaults to story title if blank.">
            <Input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
          </Field>
          <Field label="SEO Description" hint="Defaults to excerpt if blank.">
            <Textarea value={seoDescription} onChange={e => setSeoDesc(e.target.value)} rows={2} />
          </Field>
        </div>

        <Checkbox label="Published (visible on public site)" checked={isPublished} onChange={e => setPublished(e.target.checked)} />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-40">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Story'}
          </button>
          <button type="button" onClick={() => router.push('/admin/stories')} className="btn btn-outline-light">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
