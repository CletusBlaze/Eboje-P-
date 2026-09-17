import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import SiteLayout from '@/components/layout/SiteLayout'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'EBOJE P — Creating Meaningful Opportunities',
    template: '%s | EBOJE P',
  },
  description: 'Creating meaningful opportunities and lasting impact in communities across Nigeria through education, healthcare, empowerment, and community development.',
  keywords: ['NGO', 'nonprofit', 'Nigeria', 'community development', 'education', 'empowerment', 'Delta State', 'charity', 'donate'],
  authors: [{ name: 'EBOJE P', url: BASE }],
  creator: 'EBOJE P',
  publisher: 'EBOJE P',
  category: 'nonprofit',

  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: BASE,
    siteName: 'EBOJE P',
    title: 'EBOJE P — Creating Meaningful Opportunities',
    description: 'Creating meaningful opportunities and lasting impact in communities across Nigeria.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EBOJE P — Creating Meaningful Opportunities',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EBOJE P — Creating Meaningful Opportunities',
    description: 'Creating meaningful opportunities and lasting impact in communities across Nigeria.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

// Organization structured data (JSON-LD)
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'EBOJE P',
  url: BASE,
  description: 'Creating meaningful opportunities and lasting impact in communities across Nigeria.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NG',
    addressRegion: 'Delta State',
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
