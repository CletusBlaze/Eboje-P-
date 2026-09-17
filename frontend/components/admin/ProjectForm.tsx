'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import { Field, Input, Textarea, Select, Checkbox } from '@/components/admin/AdminFormFields'
import type { Project, Program, PaginatedResponse } from '@/types'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const STATUS_OPTIONS = [
  { value: 'ongoing',   label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'upcoming',  label: 'Upcoming' },
]

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const isEdit = !!project

  const [programs, setPrograms]         = useState<Program[]>([])
  const [title, setTitle]               = useState(project?.title ?? '')
  const [slug, setSlug]                 = useState(project?.slug ?? '')
  const [shortDescription, setShort]    = useState(project?.shortDescription ?? '')
  const [description, setDescription]   = useState(project?.description ?? '')
  const [content, setContent]           = useState(project?.content ?? '')
  const [location, setLocation]         = useState(project?.location ?? '')
  const [startDate, setStartDate]       = useState(project?.startDate?.slice(0, 10) ?? '')
  const [endDate, setEndDate]           = useState(project?.endDate?.slice(0, 10) ?? '')
  const [status, setStatus]             = useState(project?.status ?? 'ongoing')
  const [programId, setProgramId]       = useState(project?.programId ?? '')
  const [featuredImage, setImage]       = useState(project?.featuredImage ?? '')
  const [isFeatured, setFeatured]       = useState(project?.isFeatured ?? false)
  const [error, setError]               = useState('')
  const [saving, setSaving]             = useState(false)

  useEffect(() => {
    api.get<PaginatedResponse<Program>>('/programs?limit=100')
      .then(res => setPrograms(res.data))
      .catch(() => null)
  }, [])

  useEffect(() => {
    if (!isEdit) setSlug(slugify(title))
  }, [title, isEdit])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const body = { title, slug, shortDescription, description, content, location, startDate, endDate: endDate || null, status, programId: programId || null, featuredImage, isFeatured }
      if (isEdit) {
        await api.put(`/projects/${project.id}`, body, { token: getToken() ?? undefined })
      } else {
        await api.post('/projects', body, { token: getToken() ?? undefined })
      }
      router.push('/admin/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const programOptions = [
    { value: '', label: '— No program —' },
    ...programs.map(p => ({ value: p.id, label: p.title })),
  ]

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl text-white mb-8">
        {isEdit ? 'Edit Project' : 'New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" required>
          <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </Field>

        <Field label="Slug" required>
          <Input value={slug} onChange={e => setSlug(e.target.value)} required />
        </Field>

        <Field label="Short Description" required>
          <Textarea value={shortDescription} onChange={e => setShort(e.target.value)} rows={2} required />
        </Field>

        <Field label="Full Description" required>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} required />
        </Field>

        <Field label="Content" hint="Detailed body content (challenge, what we did, results)">
          <Textarea value={content} onChange={e => setContent(e.target.value)} rows={6} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location" required>
            <Input value={location} onChange={e => setLocation(e.target.value)} required />
          </Field>
          <Field label="Status" required>
            <Select value={status} onChange={e => setStatus(e.target.value)} options={STATUS_OPTIONS} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date">
            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </Field>
          <Field label="End Date">
            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </Field>
        </div>

        <Field label="Program">
          <Select value={programId} onChange={e => setProgramId(e.target.value)} options={programOptions} />
        </Field>

        <Field label="Featured Image URL">
          <Input value={featuredImage} onChange={e => setImage(e.target.value)} placeholder="https://..." />
        </Field>

        <Checkbox label="Featured project (shown on homepage)" checked={isFeatured} onChange={e => setFeatured(e.target.checked)} />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-40">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
          <button type="button" onClick={() => router.push('/admin/projects')} className="btn btn-outline-light">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
