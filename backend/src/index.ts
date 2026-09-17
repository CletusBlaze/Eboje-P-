import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

dotenv.config()

import { testConnection } from '@/config/database'
import { errorHandler, notFound } from '@/middleware/errorHandler'

import authRoutes from '@/routes/auth.routes'
import programRoutes from '@/routes/programs.routes'
import projectRoutes from '@/routes/projects.routes'
import storyRoutes from '@/routes/stories.routes'
import donationRoutes from '@/routes/donations.routes'
import miscRoutes from '@/routes/misc.routes'

const app = express()
const PORT = process.env.PORT || 5000

// ─── SECURITY ────────────────────────────────────────────────────────────────

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Stricter rate limit for auth
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many login attempts, please try again later.' },
}))

// General rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
}))

// ─── BODY PARSING ────────────────────────────────────────────────────────────

// Raw body for Paystack webhook signature verification
app.use('/api/donations/webhook', express.raw({ type: 'application/json' }))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── HEALTH ──────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', project: 'Eboje P API', timestamp: new Date().toISOString() })
})

// ─── ROUTES ──────────────────────────────────────────────────────────────────

app.use('/api/auth',      authRoutes)
app.use('/api/programs',  programRoutes)
app.use('/api/projects',  projectRoutes)
app.use('/api/stories',   storyRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api',           miscRoutes)

// ─── ERROR HANDLING ──────────────────────────────────────────────────────────

app.use(notFound)
app.use(errorHandler)

// ─── START ───────────────────────────────────────────────────────────────────

async function start() {
  try {
    await testConnection()
    app.listen(PORT, () => {
      console.log(`Eboje P API running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()

export default app
