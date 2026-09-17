import { Router } from 'express'
import { initializeDonation, paystackWebhook, verifyDonation, adminGetDonations, getDonationByReference } from '@/controllers/donations.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { donationSchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

// Public
router.post('/initialize', validate(donationSchema), asyncHandler(initializeDonation))
router.get('/verify/:reference', asyncHandler(verifyDonation))

// Paystack webhook — raw body needed for signature verification
router.post('/webhook', asyncHandler(paystackWebhook))

// Admin
router.get('/', authenticate, asyncHandler(adminGetDonations))
router.get('/:reference', authenticate, asyncHandler(getDonationByReference))

export default router
