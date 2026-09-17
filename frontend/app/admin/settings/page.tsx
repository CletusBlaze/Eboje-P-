'use client'

import { useEffect, useState, FormEvent } from 'react'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import { Field, Input, Textarea } from '@/components/admin/AdminFormFields'

interface FlatSettings {
  site_name: string
  tagline: string
  email: string
  phone: string
  address: string
  instagram: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
}

const DEFAULTS: FlatSettings = {
  site_name: 'EBOJE P', tagline: '', email: '', phone: '',
  address: '', instagram: '', twitter: '', facebook: '', linkedin: '', youtube: '',
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<FlatSettings>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<{ data: Record<string, string> }>('/misc/settings', { token: getToken() ?? undefined })
      .then(res => {
        const d = res.data ?? {}
        setSettings({
          site_name:  d.site_name  ?? DEFAULTS.site_name,
          tagline:    d.tagline    ?? '',
          email:      d.email      ?? '',
          phone:      d.phone      ?? '',
          address:    d.address    ?? '',
          instagram:  d.instagram  ?? '',
          twitter:    d.twitter    ?? '',
          facebook:   d.facebook   ?? '',
          linkedin:   d.linkedin   ?? '',
          youtube:    d.youtube    ?? '',
        })
      })
      .catch(() => null)
  }, [])

  function set(key: keyof FlatSettings, value: string) {
    setSettings(s => ({ ...s, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await api.put('/misc/settings', settings, { token: getToken() ?? undefined })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl text-white mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Site Name" required>
            <Input value={settings.site_name} onChange={e => set('site_name', e.target.value)} required />
          </Field>
          <Field label="Tagline">
            <Input value={settings.tagline} onChange={e => set('tagline', e.target.value)} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <Input type="email" value={settings.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input value={settings.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
        </div>

        <Field label="Address">
          <Textarea value={settings.address} onChange={e => set('address', e.target.value)} rows={2} />
        </Field>

        <div className="border-t border-white/10 pt-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Social Links</p>
          {(['instagram', 'twitter', 'facebook', 'linkedin', 'youtube'] as const).map(platform => (
            <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
              <Input
                value={settings[platform]}
                onChange={e => set(platform, e.target.value)}
                placeholder={`https://${platform}.com/ebojep`}
              />
            </Field>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {saved && <p className="text-emerald-400 text-sm">Settings saved.</p>}

        <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-40">
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
