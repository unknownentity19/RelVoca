/**
 * Neon connection, plus a one-time schema apply.
 *
 * Files under api/ whose name starts with `_` are not routed by Vercel, so this
 * is a shared module rather than an endpoint.
 *
 * The schema is applied lazily on cold start instead of as a separate migration
 * step: every statement is idempotent, the promise is memoised per instance so
 * it runs at most once per container, and it means there is no "did you run the
 * migration?" failure mode on a fresh database.
 */
import { neon } from '@neondatabase/serverless';

/**
 * The client is built on first query, not at import.
 *
 * neon() throws immediately when handed an empty connection string, so
 * constructing it at module scope makes *every* route fail to load when
 * DATABASE_URL is missing — including /api/auth/me, whose whole job is to
 * degrade to "signed out" rather than break the page. Deferring it means an
 * unconfigured deployment produces one clear error from the endpoint that
 * actually needed the database.
 */
let client = null;

function connection() {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  client = neon(url);
  return client;
}

/** Tagged-template query: sql`SELECT ...`. */
export function sql(strings, ...values) {
  return connection()(strings, ...values);
}

let ready = null;

/** Apply db/schema.sql. Safe to call on every request; runs once per instance. */
export function ensureSchema() {
  if (ready) return ready;

  ready = (async () => {
    await sql`CREATE EXTENSION IF NOT EXISTS citext`;
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email         citext UNIQUE NOT NULL,
        name          text,
        workspace     text,
        created_at    timestamptz NOT NULL DEFAULT now(),
        last_login_at timestamptz
      )`;

    // Added after the first deployment, so it has to be a separate statement:
    // CREATE TABLE IF NOT EXISTS does nothing to a table that already exists.
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at timestamptz`;

    await sql`
      CREATE TABLE IF NOT EXISTS login_tokens (
        token_hash bytea PRIMARY KEY,
        user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at timestamptz NOT NULL,
        used_at    timestamptz,
        created_at timestamptz NOT NULL DEFAULT now()
      )`;

    await sql`
      CREATE INDEX IF NOT EXISTS login_tokens_user_created
        ON login_tokens (user_id, created_at DESC)`;

    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        session_hash bytea PRIMARY KEY,
        user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at   timestamptz NOT NULL,
        created_at   timestamptz NOT NULL DEFAULT now(),
        user_agent   text
      )`;

    await sql`CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id)`;
  })().catch((err) => {
    // Don't cache a failure — the next request should get another attempt.
    ready = null;
    throw err;
  });

  return ready;
}
