import { Request, Response } from 'express'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { getPagination, buildPaginatedResponse } from '@/utils/pagination'

const PROJECT_SELECT = `
  p.*,
  pr.title AS program_title,
  pr.slug  AS program_slug,
  COALESCE(
    json_agg(pi ORDER BY pi."order") FILTER (WHERE pi.id IS NOT NULL),
    '[]'
  ) AS images
  FROM projects p
  LEFT JOIN programs pr ON p.program_id = pr.id
  LEFT JOIN project_images pi ON pi.project_id = p.id
`

export async function getProjects(req: Request, res: Response): Promise<void> {
  const { status } = req.query
  const where = status ? `WHERE p.status = '${status}'` : ''
  const result = await db.query(
    `SELECT ${PROJECT_SELECT} ${where} GROUP BY p.id, pr.title, pr.slug ORDER BY p.created_at DESC`
  )
  res.json({ data: result.rows })
}

export async function getFeaturedProject(_req: Request, res: Response): Promise<void> {
  const result = await db.query(
    `SELECT ${PROJECT_SELECT} WHERE p.is_featured = true GROUP BY p.id, pr.title, pr.slug LIMIT 1`
  )
  res.json({ data: result.rows[0] || null })
}

export async function getProjectBySlug(req: Request, res: Response): Promise<void> {
  const result = await db.query(
    `SELECT ${PROJECT_SELECT} WHERE p.slug = $1 GROUP BY p.id, pr.title, pr.slug`,
    [req.params.slug]
  )
  if (!result.rows[0]) throw new AppError('Project not found', 404)
  res.json({ data: result.rows[0] })
}

export async function adminGetProjects(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count] = await Promise.all([
    db.query(
      `SELECT ${PROJECT_SELECT} GROUP BY p.id, pr.title, pr.slug ORDER BY p.created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    ),
    db.query('SELECT COUNT(*) FROM projects'),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function createProject(req: Request, res: Response): Promise<void> {
  const { slug, title, description, shortDescription, location, startDate, endDate, status, programId, featuredImage, content, isFeatured } = req.body
  const result = await db.query(
    `INSERT INTO projects (slug,title,description,short_description,location,start_date,end_date,status,program_id,featured_image,content,is_featured)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [slug, title, description, shortDescription, location, startDate, endDate, status, programId, featuredImage, content, isFeatured]
  )
  res.status(201).json({ data: result.rows[0], message: 'Project created' })
}

export async function updateProject(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const { slug, title, description, shortDescription, location, startDate, endDate, status, programId, featuredImage, content, isFeatured } = req.body
  const result = await db.query(
    `UPDATE projects SET slug=$1,title=$2,description=$3,short_description=$4,location=$5,
     start_date=$6,end_date=$7,status=$8,program_id=$9,featured_image=$10,content=$11,is_featured=$12
     WHERE id=$13 RETURNING *`,
    [slug, title, description, shortDescription, location, startDate, endDate, status, programId, featuredImage, content, isFeatured, id]
  )
  if (!result.rows[0]) throw new AppError('Project not found', 404)
  res.json({ data: result.rows[0], message: 'Project updated' })
}

export async function deleteProject(req: Request, res: Response): Promise<void> {
  const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows[0]) throw new AppError('Project not found', 404)
  res.json({ message: 'Project deleted' })
}
