// ─── ADMIN ───────────────────────────────────────────────────────────────────

export interface Admin {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'super_admin'
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface AdminPublic extends Omit<Admin, 'password'> {}

// ─── PROGRAM ─────────────────────────────────────────────────────────────────

export interface Program {
  id: string
  slug: string
  title: string
  description: string
  shortDescription?: string
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
  shortDescription?: string
  location?: string
  startDate?: string
  endDate?: string
  status: ProjectStatus
  programId?: string
  program?: Program
  featuredImage?: string
  images?: ProjectImage[]
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
  createdAt: string
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
  isPublished: boolean
  isFeatured: boolean
  publishedAt?: string
  seoTitle?: string
  seoDescription?: string
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
  isActive: boolean
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
  createdAt: string
  updatedAt: string
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
  isActive: boolean
  updatedAt: string
}

// ─── VOLUNTEER ───────────────────────────────────────────────────────────────

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'declined'

export interface Volunteer {
  id: string
  fullName: string
  email: string
  phone?: string
  location?: string
  skills?: string
  areaOfInterest?: string
  availability?: string
  message?: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

// ─── PARTNER ─────────────────────────────────────────────────────────────────

export interface Partner {
  id: string
  organization: string
  contactPerson: string
  email: string
  phone?: string
  partnershipType?: string
  message?: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

// ─── CONTACT MESSAGE ─────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

// ─── DONATION ────────────────────────────────────────────────────────────────

export type DonationFrequency = 'one-time' | 'monthly'
export type DonationStatus = 'pending' | 'success' | 'failed'

export interface Donation {
  id: string
  amount: number
  currency: string
  frequency: DonationFrequency
  name: string
  email: string
  phone?: string
  reference: string
  status: DonationStatus
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationQuery {
  page?: number
  limit?: number
  search?: string
  status?: string
  category?: string
}

// ─── JWT ─────────────────────────────────────────────────────────────────────

export interface JwtPayload {
  id: string
  email: string
  role: string
}

// ─── EXPRESS ─────────────────────────────────────────────────────────────────

import { Request } from 'express'

export interface AuthRequest extends Request {
  admin?: AdminPublic
}
