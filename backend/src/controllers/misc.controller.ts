import { Request, Response } from 'express'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { getPagination, buildPaginatedResponse } from '@/utils/pagination'

// ─── VOLUNTEERS ──────────────────────────────────────────────────────────────

export async function submitVolunteer(req: Request, res: Response): Promise<void> {
  const { fullName, email, phone, location, skills, areaOfInterest, availability, message } = req.body
  const result = await db.query(
    `INSERT INTO volunteers (full_name,email,phone,location,skills,area_of_interest,availability,message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,created_at`,
    [fullName, email, phone, location, skills, areaOfInterest, availability, message]
  )
  res.status(201).json({ data: result.rows[0], message: 'Application submitted successfully' })
}

export async function adminGetVolunteers(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const { status } = req.query
  const params: unknown[] = [limit, offset]
  const where = status ? `WHERE status = $3` : ''
  if (status) params.push(status)
  const [data, count] = await Promise.all([
    db.query(`SELECT * FROM volunteers ${where} ORDER BY created_at DESC LIMIT $1 OFFSET $2`, params),
    db.query(`SELECT COUNT(*) FROM volunteers ${where}`, status ? [status] : []),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function updateVolunteerStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.body
  const result = await db.query(
    'UPDATE volunteers SET status = $1 WHERE id = $2 RETURNING *',
    [status, req.params.id]
  )
  if (!result.rows[0]) throw new AppError('Volunteer not found', 404)
  res.json({ data: result.rows[0], message: 'Status updated' })
}

// ─── PARTNERS ────────────────────────────────────────────────────────────────

export async function submitPartner(req: Request, res: Response): Promise<void> {
  const { organization, contactPerson, email, phone, partnershipType, message } = req.body
  const result = await db.query(
    `INSERT INTO partners (organization,contact_person,email,phone,partnership_type,message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,created_at`,
    [organization, contactPerson, email, phone, partnershipType, message]
  )
  res.status(201).json({ data: result.rows[0], message: 'Partnership enquiry submitted' })
}

export async function adminGetPartners(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count] = await Promise.all([
    db.query('SELECT * FROM partners ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM partners'),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function updatePartnerStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.body
  const result = await db.query(
    'UPDATE partners SET status = $1 WHERE id = $2 RETURNING *',
    [status, req.params.id]
  )
  if (!result.rows[0]) throw new AppError('Partner not found', 404)
  res.json({ data: result.rows[0], message: 'Status updated' })
}

// ─── CONTACT MESSAGES ────────────────────────────────────────────────────────

export async function submitMessage(req: Request, res: Response): Promise<void> {
  const { name, email, phone, subject, message } = req.body
  const result = await db.query(
    `INSERT INTO contact_messages (name,email,phone,subject,message)
     VALUES ($1,$2,$3,$4,$5) RETURNING id,created_at`,
    [name, email, phone, subject, message]
  )
  res.status(201).json({ data: result.rows[0], message: 'Message sent successfully' })
}

export async function adminGetMessages(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count, unread] = await Promise.all([
    db.query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM contact_messages'),
    db.query('SELECT COUNT(*) FROM contact_messages WHERE is_read = false'),
  ])
  res.json({
    ...buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit),
    unreadCount: parseInt(unread.rows[0].count),
  })
}

export async function markMessageRead(req: Request, res: Response): Promise<void> {
  const result = await db.query(
    'UPDATE contact_messages SET is_read = true WHERE id = $1 RETURNING *',
    [req.params.id]
  )
  if (!result.rows[0]) throw new AppError('Message not found', 404)
  res.json({ data: result.rows[0] })
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

export async function getGallery(req: Request, res: Response): Promise<void> {
  const { category } = req.query
  const params: unknown[] = []
  let where = 'WHERE is_active = true'
  if (category) { params.push(category); where += ` AND category = $${params.length}` }
  const result = await db.query(
    `SELECT * FROM gallery ${where} ORDER BY "order" ASC, created_at DESC`,
    params
  )
  res.json({ data: result.rows })
}

export async function adminGetGallery(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count] = await Promise.all([
    db.query('SELECT * FROM gallery ORDER BY "order" ASC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM gallery'),
  ])
  res.json(buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit))
}

export async function addGalleryImage(req: Request, res: Response): Promise<void> {
  const { url, caption, category, width, height, order } = req.body
  const result = await db.query(
    `INSERT INTO gallery (url,caption,category,width,height,"order") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [url, caption, category, width, height, order || 0]
  )
  res.status(201).json({ data: result.rows[0], message: 'Image added' })
}

export async function deleteGalleryImage(req: Request, res: Response): Promise<void> {
  const result = await db.query('DELETE FROM gallery WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rows[0]) throw new AppError('Image not found', 404)
  res.json({ message: 'Image deleted' })
}

// ─── IMPACT METRICS ──────────────────────────────────────────────────────────

export async function getImpactMetrics(_req: Request, res: Response): Promise<void> {
  const result = await db.query(
    'SELECT * FROM impact_metrics WHERE is_active = true ORDER BY "order" ASC'
  )
  res.json({ data: result.rows })
}

export async function updateImpactMetric(req: Request, res: Response): Promise<void> {
  const { label, value, suffix, prefix, description, order } = req.body
  const result = await db.query(
    `UPDATE impact_metrics SET label=$1,value=$2,suffix=$3,prefix=$4,description=$5,"order"=$6
     WHERE id=$7 RETURNING *`,
    [label, value, suffix, prefix, description, order, req.params.id]
  )
  if (!result.rows[0]) throw new AppError('Metric not found', 404)
  res.json({ data: result.rows[0], message: 'Metric updated' })
}

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────

export async function getSettings(_req: Request, res: Response): Promise<void> {
  const result = await db.query('SELECT key, value FROM site_settings')
  const settings = result.rows.reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})
  res.json({ data: settings })
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  const entries = Object.entries(req.body as Record<string, string>)
  await Promise.all(
    entries.map(([key, value]) =>
      db.query(
        `INSERT INTO site_settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, value]
      )
    )
  )
  res.json({ message: 'Settings updated' })
}

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  const [metrics, projects, stories, donations, messages, volunteers] = await Promise.all([
    db.query('SELECT SUM(value) AS total_reach FROM impact_metrics WHERE label ILIKE \'%people%\''),
    db.query('SELECT COUNT(*) FROM projects'),
    db.query('SELECT COUNT(*) FROM stories WHERE is_published = true'),
    db.query('SELECT COALESCE(SUM(amount),0) AS total FROM donations WHERE status = \'success\''),
    db.query('SELECT COUNT(*) FROM contact_messages WHERE is_read = false'),
    db.query('SELECT COUNT(*) FROM volunteers WHERE status = \'pending\''),
  ])

  res.json({
    data: {
      totalReach: parseInt(metrics.rows[0].total_reach || 0),
      totalProjects: parseInt(projects.rows[0].count),
      publishedStories: parseInt(stories.rows[0].count),
      totalDonations: parseFloat(donations.rows[0].total),
      unreadMessages: parseInt(messages.rows[0].count),
      pendingVolunteers: parseInt(volunteers.rows[0].count),
    },
  })
}
