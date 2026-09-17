import { Router } from 'express'
import {
  submitVolunteer, adminGetVolunteers, updateVolunteerStatus,
  submitPartner, adminGetPartners, updatePartnerStatus,
  submitMessage, adminGetMessages, markMessageRead,
  getGallery, adminGetGallery, addGalleryImage, deleteGalleryImage,
  getImpactMetrics, updateImpactMetric,
  getSettings, updateSettings,
  getDashboardStats,
} from '@/controllers/misc.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { volunteerSchema, partnerSchema, contactSchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

// Volunteers
router.post('/volunteers', validate(volunteerSchema), asyncHandler(submitVolunteer))
router.get('/volunteers', authenticate, asyncHandler(adminGetVolunteers))
router.patch('/volunteers/:id/status', authenticate, asyncHandler(updateVolunteerStatus))

// Partners
router.post('/partners', validate(partnerSchema), asyncHandler(submitPartner))
router.get('/partners', authenticate, asyncHandler(adminGetPartners))
router.patch('/partners/:id/status', authenticate, asyncHandler(updatePartnerStatus))

// Messages
router.post('/messages', validate(contactSchema), asyncHandler(submitMessage))
router.get('/messages', authenticate, asyncHandler(adminGetMessages))
router.patch('/messages/:id/read', authenticate, asyncHandler(markMessageRead))

// Gallery
router.get('/gallery', asyncHandler(getGallery))
router.get('/gallery/admin', authenticate, asyncHandler(adminGetGallery))
router.post('/gallery', authenticate, asyncHandler(addGalleryImage))
router.delete('/gallery/:id', authenticate, asyncHandler(deleteGalleryImage))

// Impact
router.get('/impact', asyncHandler(getImpactMetrics))
router.put('/impact/:id', authenticate, asyncHandler(updateImpactMetric))

// Settings
router.get('/settings', asyncHandler(getSettings))
router.put('/settings', authenticate, asyncHandler(updateSettings))

// Dashboard
router.get('/dashboard/stats', authenticate, asyncHandler(getDashboardStats))

export default router
