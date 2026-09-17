import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { AuthRequest } from '@/types'

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  const result = await db.query(
    'SELECT * FROM admins WHERE email = $1 AND is_active = true',
    [email.toLowerCase()]
  )

  const admin = result.rows[0]
  if (!admin) {
    throw new AppError('Invalid credentials', 401)
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    throw new AppError('Invalid credentials', 401)
  }

  await db.query('UPDATE admins SET last_login = NOW() WHERE id = $1', [admin.id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = (jwt.sign as any)(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  ) as string

  const { password: _, ...adminPublic } = admin

  res.json({
    data: { admin: adminPublic, token },
    message: 'Login successful',
  })
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  const result = await db.query(
    'SELECT id, name, email, role, is_active, last_login, created_at FROM admins WHERE id = $1',
    [req.admin?.id]
  )
  if (!result.rows[0]) throw new AppError('Admin not found', 404)
  res.json({ data: result.rows[0] })
}

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  const { currentPassword, newPassword } = req.body

  const result = await db.query('SELECT password FROM admins WHERE id = $1', [req.admin?.id])
  const admin = result.rows[0]
  if (!admin) throw new AppError('Admin not found', 404)

  const valid = await bcrypt.compare(currentPassword, admin.password)
  if (!valid) throw new AppError('Current password is incorrect', 400)

  const hashed = await bcrypt.hash(newPassword, 12)
  await db.query('UPDATE admins SET password = $1 WHERE id = $2', [hashed, req.admin?.id])

  res.json({ message: 'Password updated successfully' })
}
