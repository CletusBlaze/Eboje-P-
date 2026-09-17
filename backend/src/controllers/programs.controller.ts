import { Request, Response } from 'express'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { getPagination, buildPaginatedResponse } from '@/utils/pagination'

// ─── PUBLIC ──────────────────────────────────────────────────────────────────

export async function getPrograms(req: Request, res: Response): Promise<void> {
  const result = await db.query(
    'SELECT * FROM programs WHERE is_active = true ORDER BY "order" ASC'
  )
  res.json({ data: result.rows })
}

export async function getProgramBySlug(req: Request, res: Response): Promise<void> {
  const result = await db.query(
    'SELECT * FROM programs WHERE slug = $1 AND is_active = true',
    [req.params.slug]
  )
  if (!result.rows[0]) throw new AppError('Program not found', 404)
  res.json({ data: result.rows[0] })
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────

export async function adminGetPrograms(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count] = await Promise.all([
    db.query('SELECT * FROM programs ORDER BY "order" ASC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM programs'),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function createProgram(req: Request, res: Response): Promise<void> {
  const { slug, title, description, shortDescription, icon, featuredImage, order, isActive } = req.body
  const result = await db.query(
    `INSERT INTO programs (slug, title, description, short_description, icon, featured_image, "order", is_active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [slug, title, description, shortDescription, icon, featuredImage, order, isActive]
  )
  res.status(201).json({ data: result.rows[0], message: 'Program created' })
}

export async function updateProgram(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const { slug, title, description, shortDescription, icon, featuredImage, order, isActive } = req.body
  const result = await db.query(
    `UPDATE programs SET slug=$1, title=$2, description=$3, short_description=$4,
     icon=$5, featured_image=$6, "order"=$7, is_active=$8 WHERE id=$9 RETURNING *`,
    [slug, title, description, shortDescription, icon, featuredImage, order, isActive, id]
  )
  if (!result.rows[0]) throw new AppError('Program not found', 404)
  res.json({ data: result.rows[0], message: 'Program updated' })
}

export async function deleteProgram(req: Request, res: Response): Promise<void> {
  const result = await db.query('DELETE FROM programs WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows[0]) throw new AppError('Program not found', 404)
  res.json({ message: 'Program deleted' })
}
