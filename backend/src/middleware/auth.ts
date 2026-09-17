import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, JwtPayload } from '@/types'

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload
    req.admin = {
      id: payload.id,
      email: payload.email,
      role: payload.role as 'admin' | 'super_admin',
      name: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    }
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.admin?.role !== 'super_admin') {
    res.status(403).json({ error: 'Insufficient permissions' })
    return
  }
  next()
}
