'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="bg-ivory">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <span className="label-section">Error</span>
            <h1 className="font-display text-5xl mt-2 mb-4">Something went wrong.</h1>
            <p className="text-text-secondary mb-8">
              An unexpected error occurred. Please try again or contact us if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={reset} className="btn btn-primary">Try Again</button>
              <Link href="/" className="btn btn-outline-dark">Go Home</Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
