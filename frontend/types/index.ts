// ─── PROGRAM ─────────────────────────────────────────────────────────────────

export interface Program {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  icon?: string
  featuredImage?: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ─── PROJECT ─────────────────────────────────────────────────────────────────

export type ProjectStatus = 'ongoing' | 'completed' | 'upcoming'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  location: string
  startDate: string
  endDate?: string
  status: ProjectStatus
  programId: string
  program?: Program
  featuredImage?: string
  gallery?: ProjectImage[]
  impactNumbers?: ImpactMetric[]
  content?: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProjectImage {
  id: string
  projectId: string
  url: string
  caption?: string
  order: number
}

// ─── STORY ───────────────────────────────────────────────────────────────────

export type StoryCategory = 'impact' | 'news' | 'events' | 'updates' | 'announcements'

export interface Story {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: StoryCategory
  featuredImage?: string
  publishedAt: string
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string
  url: string
  caption?: string
  category?: string
  width?: number
  height?: number
  order: number
  createdAt: string
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  order: number
  isActive: boolean
}

// ─── IMPACT ──────────────────────────────────────────────────────────────────

export interface ImpactMetric {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  description?: string
  order: number
}

// ─── VOLUNTEER ───────────────────────────────────────────────────────────────

export interface VolunteerApplication {
  id?: string
  fullName: string
  email: string
  phone: string
  location: string
  skills: string
  areaOfInterest: string
  availability: string
  message?: string
  status?: 'pending' | 'reviewed' | 'accepted' | 'declined'
  createdAt?: string
}

// ─── PARTNER ─────────────────────────────────────────────────────────────────

export interface PartnerApplication {
  id?: string
  organization: string
  contactPerson: string
  email: string
  phone: string
  partnershipType: string
  message?: string
  status?: 'pending' | 'reviewed' | 'accepted' | 'declined'
  createdAt?: string
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead?: boolean
  createdAt?: string
}

// ─── DONATION ────────────────────────────────────────────────────────────────

export type DonationFrequency = 'one-time' | 'monthly'

export interface DonationPayload {
  amount: number
  frequency: DonationFrequency
  name: string
  email: string
  phone?: string
}

export interface Donation {
  id: string
  amount: number
  frequency: DonationFrequency
  name: string
  email: string
  phone?: string
  reference: string
  status: 'pending' | 'success' | 'failed'
  createdAt: string
}

// ─── API RESPONSE ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  details?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string
  tagline: string
  email: string
  phone: string
  address: string
  socialLinks: {
    instagram?: string
    twitter?: string
    facebook?: string
    linkedin?: string
    youtube?: string
  }
}
