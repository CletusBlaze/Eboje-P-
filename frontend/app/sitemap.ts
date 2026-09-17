import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebojep.org'

// Static routes with priorities
const STATIC: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',              priority: 1.0,  changeFrequency: 'weekly' },
  { url: '/about',         priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/programs',      priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/projects',      priority: 0.8,  changeFrequency: 'weekly' },
  { url: '/impact',        priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/stories',       priority: 0.8,  changeFrequency: 'weekly' },
  { url: '/get-involved',  priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/donate',        priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/contact',       priority: 0.6,  changeFrequency: 'yearly' },
]

async function fetchSlugs(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${endpoint}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((item: { slug: string }) => item.slug)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programSlugs, projectSlugs, storySlugs] = await Promise.all([
    fetchSlugs('/programs?limit=100'),
    fetchSlugs('/projects?limit=100'),
    fetchSlugs('/stories?limit=100'),
  ])

  const now = new Date()

  const statics = STATIC.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const programs = programSlugs.map(slug => ({
    url: `${BASE}/programs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projects = projectSlugs.map(slug => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const stories = storySlugs.map(slug => ({
    url: `${BASE}/stories/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...statics, ...programs, ...projects, ...stories]
}
