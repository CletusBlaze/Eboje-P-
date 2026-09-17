export function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function formatNumber(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

export function getImagePlaceholder(category: string): string {
  const placeholders: Record<string, string> = {
    hero: '/images/placeholders/hero.jpg',
    about: '/images/placeholders/about.jpg',
    programs: '/images/placeholders/programs.jpg',
    projects: '/images/placeholders/projects.jpg',
    stories: '/images/placeholders/stories.jpg',
    gallery: '/images/placeholders/gallery.jpg',
    team: '/images/placeholders/team.jpg',
  }
  return placeholders[category] ?? '/images/placeholders/default.jpg'
}
