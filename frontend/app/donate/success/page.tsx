'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import type { Donation } from '@/types'

type State = 'loading' | 'success' | 'failed' | 'error'

function SuccessContent() {
  const params = useSearchParams()
  const reference = params.get('reference') ?? params.get('trxref')
  const [state, setState] = useState<State>('loading')
  const [donation, setDonation] = useState<Donation | null>(null)

  useEffect(() => {
    if (!reference) { setState('error'); return }
    api.get<{ data: Donation }>(`/donations/verify/${reference}`)
      .then(res => {
        setDonation(res.data)
        setState(res.data.status === 'success' ? 'success' : 'failed')
      })
      .catch(() => setState('error'))
  }, [reference])

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-text-secondary text-sm animate-pulse">Verifying your donation…</p>
      </div>
    )
  }

  if (state === 'success' && donation) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span className="label-section">Thank You</span>
          <h1 className="font-display text-4xl mt-2 mb-4">
            Your gift matters, {donation.name.split(' ')[0]}.
          </h1>
          <p className="text-text-secondary mb-2">
            ₦{Number(donation.amount).toLocaleString()}{' '}
            {donation.frequency === 'monthly' ? '/ month' : 'one-time'} donation confirmed.
          </p>
          <p className="text-text-secondary text-sm mb-8">
            A receipt has been sent to <strong>{donation.email}</strong>.
          </p>

          <span className="gold-line mx-auto mb-8" />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-primary">Back to Home</Link>
            <Link href="/impact" className="btn btn-outline-dark">See Our Impact</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full border-2 border-red-300 flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <span className="label-section">Payment Unsuccessful</span>
        <h1 className="font-display text-4xl mt-2 mb-4">Something went wrong.</h1>
        <p className="text-text-secondary mb-8">
          Your payment could not be completed. No charge was made. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/donate" className="btn btn-primary">Try Again</Link>
          <Link href="/contact" className="btn btn-outline-dark">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-text-secondary text-sm animate-pulse">Loading…</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
