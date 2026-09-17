import { Request, Response } from 'express'
import crypto from 'crypto'
import { db } from '@/config/database'
import { AppError } from '@/middleware/errorHandler'
import { getPagination, buildPaginatedResponse } from '@/utils/pagination'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || ''
const PAYSTACK_BASE = 'https://api.paystack.co'

// ─── PUBLIC ──────────────────────────────────────────────────────────────────

export async function initializeDonation(req: Request, res: Response): Promise<void> {
  const { amount, frequency, name, email, phone } = req.body

  // Amount in kobo (Paystack uses smallest currency unit)
  const amountKobo = Math.round(amount * 100)

  // Generate unique reference
  const reference = `eboje-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  // Store pending donation first
  await db.query(
    `INSERT INTO donations (amount,currency,frequency,name,email,phone,reference,status)
     VALUES ($1,'NGN',$2,$3,$4,$5,$6,'pending')`,
    [amount, frequency, name, email, phone, reference]
  )

  // Initialize with Paystack
  const response = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amountKobo,
      reference,
      metadata: { name, phone, frequency, custom_fields: [{ display_name: 'Donor Name', variable_name: 'donor_name', value: name }] },
      callback_url: `${process.env.FRONTEND_URL}/donate/success`,
    }),
  })

  const data = await response.json() as { status: boolean; data?: { authorization_url: string; reference: string } }

  if (!data.status || !data.data) {
    await db.query('UPDATE donations SET status = $1 WHERE reference = $2', ['failed', reference])
    throw new AppError('Payment initialization failed', 502)
  }

  res.json({
    data: {
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    },
  })
}

// ─── WEBHOOK — server-side verification only ─────────────────────────────────

export async function paystackWebhook(req: Request, res: Response): Promise<void> {
  // Verify signature
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash !== req.headers['x-paystack-signature']) {
    res.status(400).json({ error: 'Invalid signature' })
    return
  }

  const { event, data } = req.body as { event: string; data: { reference: string; status: string; amount: number } }

  if (event === 'charge.success') {
    await db.query(
      `UPDATE donations SET status = 'success', metadata = $1 WHERE reference = $2`,
      [JSON.stringify(data), data.reference]
    )
  }

  if (event === 'charge.failed') {
    await db.query(
      `UPDATE donations SET status = 'failed' WHERE reference = $1`,
      [data.reference]
    )
  }

  // Always respond 200 to Paystack immediately
  res.sendStatus(200)
}

export async function verifyDonation(req: Request, res: Response): Promise<void> {
  const { reference } = req.params

  const response = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  })

  const data = await response.json() as { status: boolean; data?: { status: string } }

  if (!data.status || !data.data) throw new AppError('Verification failed', 502)

  const status = data.data.status === 'success' ? 'success' : 'failed'
  await db.query('UPDATE donations SET status = $1 WHERE reference = $2', [status, reference])

  const donation = await db.query('SELECT * FROM donations WHERE reference = $1', [reference])
  res.json({ data: donation.rows[0] })
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────

export async function adminGetDonations(req: Request, res: Response): Promise<void> {
  const { page, limit, offset } = getPagination(req.query)
  const [data, count, total] = await Promise.all([
    db.query('SELECT * FROM donations ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM donations'),
    db.query('SELECT COALESCE(SUM(amount),0) AS total FROM donations WHERE status = \'success\''),
  ])
  res.json({
    ...buildPaginatedResponse(data.rows, parseInt(count.rows[0].count), page, limit),
    totalAmount: parseFloat(total.rows[0].total),
  })
}

export async function getDonationByReference(req: Request, res: Response): Promise<void> {
  const result = await db.query('SELECT * FROM donations WHERE reference = $1', [req.params.reference])
  if (!result.rows[0]) throw new AppError('Donation not found', 404)
  res.json({ data: result.rows[0] })
}
