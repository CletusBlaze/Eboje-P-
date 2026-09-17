# EBOJE P — Deployment Guide

---

## Prerequisites

- GitHub repository with this codebase pushed
- [Supabase](https://supabase.com) project created
- [Paystack](https://dashboard.paystack.com) account with live keys
- [Vercel](https://vercel.com) account
- [Render](https://render.com) account (or Railway)

---

## 1. Database Setup (Supabase)

1. Create a new Supabase project at https://supabase.com
2. Go to **SQL Editor** and run the full schema:
   ```
   backend/src/config/schema.sql
   ```
3. Note your credentials from **Project Settings → API**:
   - Project URL
   - `anon` key
   - `service_role` key
4. Note your database connection string from **Project Settings → Database → Connection string (URI)**
   - Append `?sslmode=require` to the URI

---

## 2. Backend Deployment (Render)

### Option A — Using render.yaml (recommended)

1. Push the repo to GitHub
2. Go to https://render.com → **New → Blueprint**
3. Connect your GitHub repo and select the `backend/` folder
4. Render will detect `render.yaml` automatically
5. Fill in the environment variables marked `sync: false`:
   - `FRONTEND_URL` — your Vercel URL (set after frontend deploy, update later)
   - `DATABASE_URL` — Supabase connection string with `?sslmode=require`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PAYSTACK_SECRET_KEY` — live secret key
   - `PAYSTACK_PUBLIC_KEY` — live public key
6. Deploy. Render will build the Docker image and start the service.
7. Note your service URL: `https://ebojep-api.onrender.com`

### Option B — Manual Render setup

1. New → **Web Service** → connect repo
2. Root directory: `backend`
3. Runtime: **Docker**
4. Health check path: `/health`
5. Add all environment variables from `backend/.env.example`

### Verify backend is live

```
curl https://ebojep-api.onrender.com/health
# → {"status":"ok","project":"Eboje P API","timestamp":"..."}
```

---

## 3. Paystack Webhook

1. Go to Paystack Dashboard → **Settings → API Keys & Webhooks**
2. Add webhook URL:
   ```
   https://ebojep-api.onrender.com/api/donations/webhook
   ```
3. Enable events: `charge.success`, `charge.failed`
4. The backend verifies the `x-paystack-signature` header automatically — no extra config needed.

---

## 4. Frontend Deployment (Vercel)

1. Go to https://vercel.com → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Framework: **Next.js** (auto-detected)
5. Add environment variables:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://ebojep-api.onrender.com/api` |
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Your Paystack live public key |
   | `NEXT_PUBLIC_SITE_URL` | `https://ebojep.org` (or your Vercel URL) |
   | `NEXT_PUBLIC_SITE_NAME` | `EBOJE P` |

6. Deploy.
7. Note your Vercel URL (e.g. `https://ebojep.vercel.app`)

### Custom domain (optional)

1. Vercel → Project → **Settings → Domains**
2. Add `ebojep.org` and `www.ebojep.org`
3. Update DNS records at your registrar as instructed by Vercel

---

## 5. Post-Deploy Checklist

### Update CORS

After frontend is live, update `FRONTEND_URL` in Render:
```
FRONTEND_URL=https://ebojep.org
```
Trigger a redeploy on Render.

### Update vercel.json rewrite

In `frontend/vercel.json`, update the rewrite destination if your Render URL differs:
```json
"destination": "https://your-actual-render-url.onrender.com/api/:path*"
```

### Seed admin user

Run this SQL in Supabase SQL Editor (replace values):
```sql
INSERT INTO admins (email, password_hash, role)
VALUES (
  'admin@ebojep.org',
  '$2b$10$<bcrypt_hash_of_your_password>',
  'super_admin'
);
```

To generate a bcrypt hash locally:
```bash
node -e "const b=require('bcryptjs'); b.hash('YourPassword123!', 10).then(console.log)"
```

### Verify full flow

- [ ] `GET /health` returns 200
- [ ] Admin login works at `/admin/login`
- [ ] Donation flow completes (use Paystack test card: `4084 0840 8408 4081`, CVV `408`, expiry any future date)
- [ ] Paystack webhook fires and updates donation status
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

---

## 6. Environment Variables Summary

### Frontend (Vercel)

```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SITE_NAME
```

### Backend (Render)

```
NODE_ENV=production
PORT=5000
FRONTEND_URL
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET
JWT_EXPIRES_IN=7d
PAYSTACK_SECRET_KEY
PAYSTACK_PUBLIC_KEY
STORAGE_BUCKET=eboje-p-media
```

---

## 7. Production Build Test (local)

Before deploying, verify builds pass locally:

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
node dist/index.js
```

---

## Render Free Tier Note

Render's free tier spins down after 15 minutes of inactivity. The first request after spin-down takes ~30 seconds. To avoid this on production, upgrade to the **Starter** plan ($7/month) or use Railway which has no cold starts on paid plans.

---

© 2026 EBOJE P
