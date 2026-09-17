import { Router } from 'express'
import { getProjects, getFeaturedProject, getProjectBySlug, adminGetProjects, createProject, updateProject, deleteProject } from '@/controllers/projects.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { projectSchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

router.get('/', asyncHandler(getProjects))
router.get('/featured', asyncHandler(getFeaturedProject))
router.get('/:slug', asyncHandler(getProjectBySlug))

router.get('/admin/all', authenticate, asyncHandler(adminGetProjects))
router.post('/', authenticate, validate(projectSchema), asyncHandler(createProject))
router.put('/:id', authenticate, validate(projectSchema), asyncHandler(updateProject))
router.delete('/:id', authenticate, asyncHandler(deleteProject))

export default router
