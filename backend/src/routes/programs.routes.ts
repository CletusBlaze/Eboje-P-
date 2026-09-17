import { Router } from 'express'
import { getPrograms, getProgramBySlug, adminGetPrograms, createProgram, updateProgram, deleteProgram } from '@/controllers/programs.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { programSchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

// Public
router.get('/', asyncHandler(getPrograms))
router.get('/:slug', asyncHandler(getProgramBySlug))

// Admin
router.get('/admin/all', authenticate, asyncHandler(adminGetPrograms))
router.post('/', authenticate, validate(programSchema), asyncHandler(createProgram))
router.put('/:id', authenticate, validate(programSchema), asyncHandler(updateProgram))
router.delete('/:id', authenticate, asyncHandler(deleteProgram))

export default router
