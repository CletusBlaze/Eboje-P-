import { Router } from 'express'
import { login, me, changePassword } from '@/controllers/auth.controller'
import { authenticate } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { loginSchema, changePasswordSchema } from '@/validators'
import { asyncHandler } from '@/utils/asyncHandler'

const router = Router()

router.post('/login', validate(loginSchema), asyncHandler(login))
router.get('/me', authenticate, asyncHandler(me))
router.put('/change-password', authenticate, validate(changePasswordSchema), asyncHandler(changePassword))

export default router
