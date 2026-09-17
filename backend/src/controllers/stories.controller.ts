import { Request, Response } from 'express'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { getPagination, buildPaginatedResponse } from '@/utils/pagination'

export async function getStories(req: Request, res: Response): Promise<void> {
  const { category } = req.query
  const params: unknown[] = []
  let where = 'WHERE is_published = true'
  if (category) { params.push(category); where += ` AND category = $${params.length}` }
  const result = await db.query(
    `SELECT id,slug,title,excerpt,author,category,featured_image,is_featured,published_at
     FROM stories ${where} ORDER BY published_at DESC`,
    params
  )
  res.json({ data: result.rows })
}

export async function getFeaturedStories(_req: Request, res: Response): Promise<void> {
  const result = await db.query(
    `SELECT id,slug,title,excerpt,author,category,featured_image,published_at
     FROM stories WHERE is_published = true AND is_featured = true
     ORDER BY published_at DESC LIMIT 3`
  )
  res.json({ data: result.rows })
}

export async function getStoryBySlug(req: Request, res: Response): Promise<void> {
  const result = await db.query(
    'SELECT * FROM stories WHERE slug = $1 AND is_published = true',
    [req.params.slug]
  )
  if (!result.rows[0]) throw new AppError('Story not found', 404)
  res.json({ data: result.rows[0] })
}

export async function adminGetStories(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count] = await Promise.all([
    db.query('SELECT * FROM stories ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM stories'),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function createStory(req: Request, res: Response): Promise<void> {
  const { slug, title, excerpt, content, author, category, featuredImage, isPublished, isFeatured, seoTitle, seoDescription } = req.body
  const publishedAt = isPublished ? new Date().toISOString() : null
  const result = await db.query(
    `INSERT INTO stories (slug,title,excerpt,content,author,category,featured_image,is_published,is_featured,published_at,seo_title,seo_description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [slug, title, excerpt, content, author, category, featuredImage, isPublished, isFeatured, publishedAt, seoTitle, seoDescription]
  )
  res.status(201).json({ data: result.rows[0], message: 'Story created' })
}

export async function updateStory(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const { slug, title, excerpt, content, author, category, featuredImage, isPublished, isFeatured, seoTitle, seoDescription } = req.body

  const existing = await db.query('SELECT is_published, published_at FROM stories WHERE id = $1', [id])
  if (!existing.rows[0]) throw new AppError('Story not found', 404)

  const publishedAt = isPublished && !existing.rows[0].is_published
    ? new Date().toISOString()
    : existing.rows[0].published_at

  const result = await db.query(
    `UPDATE stories SET slug=$1,title=$2,excerpt=$3,content=$4,author=$5,category=$6,
     featured_image=$7,is_published=$8,is_featured=$9,published_at=$10,seo_title=$11,seo_description=$12
     WHERE id=$13 RETURNING *`,
    [slug, title, excerpt, content, author, category, featuredImage, isPublished, isFeatured, publishedAt, seoTitle, seoDescription, id]
  )
  res.json({ data: result.rows[0], message: 'Story updated' })
}

export async function deleteStory(req: Request, res: Response): Promise<void> {
  const result = await db.query('DELETE FROM stories WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows[0]) throw new AppError('Story not found', 404)
  res.json({ message: 'Story deleted' })
}
