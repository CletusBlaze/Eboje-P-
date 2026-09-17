import { z } from 'zod'

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

// ─── PROGRAM ─────────────────────────────────────────────────────────────────

export const programSchema = z.object({
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  shortDescription: z.string().max(500).optional(),
  icon: z.string().max(100).optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

// ─── PROJECT ─────────────────────────────────────────────────────────────────

export const projectSchema = z.object({
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  shortDescription: z.string().max(500).optional(),
  location: z.string().max(255).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['ongoing', 'completed', 'upcoming']).default('ongoing'),
  programId: z.string().uuid().optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  content: z.string().optional(),
  isFeatured: z.boolean().default(false),
})

// ─── STORY ───────────────────────────────────────────────────────────────────

export const storySchema = z.object({
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1).max(500),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().max(255).default('Eboje P Team'),
  category: z.enum(['impact', 'news', 'events', 'updates', 'announcements']).default('impact'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().max(500).optional(),
})

// ─── VOLUNTEER ───────────────────────────────────────────────────────────────

export const volunteerSchema = z.object({
  fullName: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  location: z.string().max(255).optional(),
  skills: z.string().optional(),
  areaOfInterest: z.string().max(255).optional(),
  availability: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
})

// ─── PARTNER ─────────────────────────────────────────────────────────────────

export const partnerSchema = z.object({
  organization: z.string().min(2).max(255),
  contactPerson: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  partnershipType: z.string().max(255).optional(),
  message: z.string().max(2000).optional(),
})

// ─── CONTACT MESSAGE ─────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  subject: z.string().min(2).max(500),
  message: z.string().min(10).max(5000),
})

// ─── DONATION ────────────────────────────────────────────────────────────────

export const donationSchema = z.object({
  amount: z.number().positive().min(100, 'Minimum donation is ₦100'),
  frequency: z.enum(['one-time', 'monthly']).default('one-time'),
  name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
})

// ─── PAGINATION ──────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
})
