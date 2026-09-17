import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <span className="label-section">404</span>
        <h1 className="font-display text-5xl mt-2 mb-4">Page not found.</h1>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <span className="gold-line mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/contact" className="btn btn-outline-dark">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
