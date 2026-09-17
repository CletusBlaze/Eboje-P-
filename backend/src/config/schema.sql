-- ─── EBOJE P DATABASE SCHEMA ─────────────────────────────────────────────────
-- Run this file against your PostgreSQL database to create all tables.
-- Order matters — referenced tables must exist before foreign keys.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for text search

-- ─── ADMINS ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admins (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PROGRAMS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS programs (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              VARCHAR(255) UNIQUE NOT NULL,
  title             VARCHAR(255) NOT NULL,
  description       TEXT NOT NULL,
  short_description VARCHAR(500),
  icon              VARCHAR(100),
  featured_image    TEXT,
  "order"           INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PROJECTS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              VARCHAR(255) UNIQUE NOT NULL,
  title             VARCHAR(255) NOT NULL,
  description       TEXT NOT NULL,
  short_description VARCHAR(500),
  location          VARCHAR(255),
  start_date        DATE,
  end_date          DATE,
  status            VARCHAR(50) NOT NULL DEFAULT 'ongoing'
                    CHECK (status IN ('ongoing', 'completed', 'upcoming')),
  program_id        UUID REFERENCES programs(id) ON DELETE SET NULL,
  featured_image    TEXT,
  content           TEXT,
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  caption     VARCHAR(500),
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── STORIES ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS story_categories (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  VARCHAR(100) UNIQUE NOT NULL,
  slug  VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS stories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            VARCHAR(255) UNIQUE NOT NULL,
  title           VARCHAR(500) NOT NULL,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  author          VARCHAR(255) NOT NULL DEFAULT 'Eboje P Team',
  category        VARCHAR(100) NOT NULL DEFAULT 'impact'
                  CHECK (category IN ('impact', 'news', 'events', 'updates', 'announcements')),
  featured_image  TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT false,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMPTZ,
  seo_title       VARCHAR(255),
  seo_description VARCHAR(500),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── GALLERY ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url         TEXT NOT NULL,
  caption     VARCHAR(500),
  category    VARCHAR(100),
  width       INTEGER,
  height      INTEGER,
  "order"     INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TEAM ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS team_members (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  role        VARCHAR(255) NOT NULL,
  bio         TEXT,
  image       TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── IMPACT METRICS ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS impact_metrics (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label       VARCHAR(255) NOT NULL,
  value       NUMERIC NOT NULL DEFAULT 0,
  suffix      VARCHAR(20),
  prefix      VARCHAR(20),
  description TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── VOLUNTEERS ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS volunteers (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name        VARCHAR(255) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  phone            VARCHAR(50),
  location         VARCHAR(255),
  skills           TEXT,
  area_of_interest VARCHAR(255),
  availability     VARCHAR(100),
  message          TEXT,
  status           VARCHAR(50) NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'reviewed', 'accepted', 'declined')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PARTNERS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partners (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization     VARCHAR(255) NOT NULL,
  contact_person   VARCHAR(255) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  phone            VARCHAR(50),
  partnership_type VARCHAR(255),
  message          TEXT,
  status           VARCHAR(50) NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'reviewed', 'accepted', 'declined')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CONTACT MESSAGES ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  subject     VARCHAR(500) NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── DONATIONS ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS donations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount      NUMERIC(12, 2) NOT NULL,
  currency    VARCHAR(10) NOT NULL DEFAULT 'NGN',
  frequency   VARCHAR(20) NOT NULL DEFAULT 'one-time'
              CHECK (frequency IN ('one-time', 'monthly')),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  reference   VARCHAR(255) UNIQUE NOT NULL,
  status      VARCHAR(50) NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'success', 'failed')),
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SITE SETTINGS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_settings (
  key         VARCHAR(255) PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_projects_program_id   ON projects(program_id);
CREATE INDEX IF NOT EXISTS idx_projects_status        ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured   ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_stories_category       ON stories(category);
CREATE INDEX IF NOT EXISTS idx_stories_is_published   ON stories(is_published);
CREATE INDEX IF NOT EXISTS idx_stories_is_featured    ON stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_donations_status       ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_email        ON donations(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_status      ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read  ON contact_messages(is_read);

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'admins','programs','projects','stories',
    'team_members','volunteers','partners','donations'
  ] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s;
       CREATE TRIGGER trg_%s_updated_at
       BEFORE UPDATE ON %s
       FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
      t, t, t, t
    );
  END LOOP;
END;
$$;

-- ─── SEED: DEFAULT IMPACT METRICS ────────────────────────────────────────────

INSERT INTO impact_metrics (label, value, suffix, "order") VALUES
  ('People reached',   12000, '+', 1),
  ('Communities',      24,    '',  2),
  ('Programs',         18,    '',  3),
  ('Years of impact',  7,     '',  4)
ON CONFLICT DO NOTHING;

-- ─── SEED: DEFAULT SITE SETTINGS ─────────────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES
  ('site_name',    'Eboje P'),
  ('tagline',      'Creating meaningful opportunities and lasting impact.'),
  ('email',        'hello@ebojep.org'),
  ('phone',        '+234 000 000 0000'),
  ('address',      'Delta State, Nigeria'),
  ('instagram',    ''),
  ('twitter',      ''),
  ('facebook',     ''),
  ('linkedin',     '')
ON CONFLICT (key) DO NOTHING;
