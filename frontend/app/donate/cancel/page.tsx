import Link from 'next/link'

export default function DonateCancelPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full border-2 border-text-primary/20 flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <span className="label-section">Cancelled</span>
        <h1 className="font-display text-4xl mt-2 mb-4">No payment was made.</h1>
        <p className="text-text-secondary mb-8">
          You cancelled the payment. Whenever you&apos;re ready, we&apos;d love your support.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/donate" className="btn btn-primary">Try Again</Link>
          <Link href="/" className="btn btn-outline-dark">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
