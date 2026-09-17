import { Router } from 'express'
import { getStories, getFeaturedStories, getStoryBySlug, adminGetStories, createStory, updateStory, deleteStory } from '@/controllers/stories.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { storySchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

router.get('/', asyncHandler(getStories))
router.get('/featured', asyncHandler(getFeaturedStories))
router.get('/:slug', asyncHandler(getStoryBySlug))

router.get('/admin/all', authenticate, asyncHandler(adminGetStories))
router.post('/', authenticate, validate(storySchema), asyncHandler(createStory))
router.put('/:id', authenticate, validate(storySchema), asyncHandler(updateStory))
router.delete('/:id', authenticate, asyncHandler(deleteStory))

export default router
