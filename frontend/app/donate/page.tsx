'use client'

import { useState, FormEvent } from 'react'
import { api } from '@/lib/api/client'
import PageHero from '@/components/ui/PageHero'

const PRESETS = [1000, 2500, 5000, 10000, 25000, 50000]

type Frequency = 'one-time' | 'monthly'

export default function DonatePage() {
  const [amount, setAmount] = useState<number | ''>('')
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const finalAmount = amount !== '' ? amount : custom ? parseFloat(custom) : 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!finalAmount || finalAmount < 100) {
      setError('Minimum donation is ₦100')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await api.post<{ data: { authorizationUrl: string } }>('/donations/initialize', {
        amount: finalAmount,
        frequency,
        name,
        email,
        phone: phone || undefined,
      })
      window.location.href = res.data.authorizationUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        label="Give"
        heading="Make a Difference Today"
        description="Every contribution — large or small — creates lasting change in the communities we serve."
      />

      <section className="section-padding bg-ivory">
        <div className="container-site max-w-2xl">

          {/* Frequency toggle */}
          <div className="flex gap-2 mb-8">
            {(['one-time', 'monthly'] as Frequency[]).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={`btn text-xs py-2 px-5 ${frequency === f ? 'btn-primary' : 'btn-outline-dark'}`}
              >
                {f === 'one-time' ? 'One-Time' : 'Monthly'}
              </button>
            ))}
          </div>

          {/* Preset amounts */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {PRESETS.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => { setAmount(p); setCustom('') }}
                className={`py-3 text-sm font-semibold border transition-colors rounded-sm ${
                  amount === p
                    ? 'bg-obsidian text-white border-obsidian'
                    : 'bg-white text-text-primary border-text-primary/20 hover:border-obsidian'
                }`}
              >
                ₦{p.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mb-8">
            <input
              type="number"
              placeholder="Custom amount (₦)"
              value={custom}
              onChange={e => { setCustom(e.target.value); setAmount('') }}
              min={100}
              className="w-full border border-text-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-obsidian transition-colors rounded-sm"
            />
          </div>

          {/* Selected amount display */}
          {finalAmount > 0 && (
            <div className="mb-8 py-4 border-y border-text-primary/10 flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                {frequency === 'monthly' ? 'Monthly donation' : 'One-time donation'}
              </span>
              <span className="font-display text-2xl text-text-primary">
                ₦{finalAmount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Donor form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full border border-text-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-obsidian transition-colors rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-text-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-obsidian transition-colors rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-text-primary/20 bg-white px-4 py-3 text-sm outline-none focus:border-obsidian transition-colors rounded-sm"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !finalAmount}
              className="btn btn-primary w-full justify-center mt-2 disabled:opacity-40"
            >
              {loading ? 'Redirecting to payment…' : `Donate${finalAmount ? ` ₦${finalAmount.toLocaleString()}` : ''}`}
            </button>

            <p className="text-xs text-text-secondary text-center pt-2">
              Secured by Paystack. Your payment details are never stored on our servers.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
