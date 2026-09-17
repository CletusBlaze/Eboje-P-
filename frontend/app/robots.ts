import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/donate/success', '/donate/cancel', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
