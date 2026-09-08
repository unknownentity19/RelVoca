-- RelVoca auth schema (Neon Postgres)
--
-- Passwordless: a sign-in request mints a single-use token, the token is
-- emailed as a link, and following the link creates a session. No password is
-- ever stored, so a database leak exposes no reusable credential.
--
-- Both tokens and session ids are stored as SHA-256 hashes rather than the
-- values themselves. Someone holding a dump of these tables cannot replay a
-- login or forge a session with what is in them.
--
-- api/_lib/db.mjs applies this on cold start (idempotent), so there is no
-- manual migration step. This file is the readable source of truth.

CREATE EXTENSION IF NOT EXISTS citext;      -- case-insensitive email equality
CREATE EXTENSION IF NOT EXISTS pgcrypto;    -- gen_random_uuid()

CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         citext UNIQUE NOT NULL,
  name          text,
  workspace     text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz,
  -- Set when the emailed link is followed. Signing in does not require it:
  -- the session starts immediately and verification confirms the address
  -- afterwards, so a mail outage never locks anyone out.
  email_verified_at timestamptz
);

CREATE TABLE IF NOT EXISTS login_tokens (
  token_hash bytea PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Supports the per-user rate limit and expiry sweeps.
CREATE INDEX IF NOT EXISTS login_tokens_user_created
  ON login_tokens (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS sessions (
  session_hash bytea PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at   timestamptz NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  user_agent   text
);

CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id);
