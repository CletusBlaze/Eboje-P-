# EBOJE P

Premium NGO platform — creating meaningful opportunities and lasting impact.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger + Framer Motion |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL via Supabase |
| Storage | Supabase Storage |
| Auth | JWT |
| Payments | Paystack |
| Deployment | Vercel (frontend) + Render/Railway (backend) |

---

## Project Structure

```
Eboje P NGO/
├── frontend/          # Next.js application
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # API client, animations, utilities
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── public/        # Static assets + image placeholders
│
└── backend/           # Express API
    └── src/
        ├── routes/        # API route definitions
        ├── controllers/   # Route handlers
        ├── middleware/     # Auth, validation, rate limiting
        ├── models/        # Database models
        ├── services/      # Business logic
        ├── validators/    # Input validation schemas
        ├── utils/         # Shared utilities
        ├── config/        # App configuration
        └── types/         # TypeScript types
```

---

## Getting Started

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Runs on http://localhost:3000

### Backend

```bash
cd backend
cp .env.example .env
npm run dev
```

Runs on http://localhost:5000

---

## Build Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Architecture + setup | ✅ Complete |
| 2 | Design system | 🔄 Next |
| 3 | Navbar + global layout | ⏳ |
| 4 | Hero section | ⏳ |
| 5 | Homepage sections | ⏳ |
| 6 | Animation system | ⏳ |
| 7 | Content pages | ⏳ |
| 8 | Database + backend | ✅ Complete |
| 9 | Admin dashboard | ✅ Complete |
| 10 | Donation system | ✅ Complete |
| 11 | Security + SEO + performance | ✅ Complete |
| 12 | Deployment | ✅ Complete |

---

## Environment Variables

Copy `.env.example` files and fill in your values. Never commit `.env` files.

- `frontend/.env.example`
- `backend/.env.example`

---

© 2026 Eboje P
