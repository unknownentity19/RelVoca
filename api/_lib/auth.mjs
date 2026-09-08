/**
 * Token, session and cookie handling.
 *
 * Two rules run through all of it:
 *
 *  1. Secrets are generated with crypto.randomBytes and only ever *stored* as a
 *     SHA-256 hash. Lookups hash the incoming value and match on that, so the
 *     database never holds anything replayable and the comparison is an index
 *     lookup rather than a string compare.
 *  2. Nothing here tells a caller whether an email exists. That decision lives
 *     in the request endpoint, but the helpers are shaped so it is easy to keep.
 */
import { randomBytes, createHash } from 'node:crypto';
import { sql } from './db.mjs';

export const TOKEN_TTL_MIN = 15;
export const SESSION_TTL_DAYS = 30;
export const COOKIE = 'relvoca_session';

/** URL-safe secret. 32 bytes = 256 bits; brute force is not a concern. */
export function newSecret() {
  return randomBytes(32).toString('base64url');
}

/** Postgres bytea wants a Buffer; SHA-256 keeps it fixed-width and indexable. */
export function hash(value) {
  return createHash('sha256').update(String(value)).digest();
}

/* ------------------------------------------------------------------ *
 * Users
 * ------------------------------------------------------------------ */

/** A display name and workspace guessed from the address, for the dashboard. */
function derive(email) {
  const [local, domain = ''] = String(email).split('@');
  const name =
    local.replace(/[._-]+/g, ' ').trim().replace(/\b[a-z]/g, (c) => c.toUpperCase()) ||
    'There';
  return { name, workspace: domain };
}

export async function findOrCreateUser(email) {
  const { name, workspace } = derive(email);
  const rows = await sql`
    INSERT INTO users (email, name, workspace)
    VALUES (${email}, ${name}, ${workspace})
    ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
    RETURNING id, email, name, workspace`;
  return rows[0];
}

/* ------------------------------------------------------------------ *
 * Sign-in tokens
 * ------------------------------------------------------------------ */

/**
 * How many tokens this user has been issued recently. The caller uses it to
 * refuse a request rather than let the endpoint be used to flood an inbox —
 * the address belongs to someone who did not necessarily ask for any of this.
 */
export async function recentTokenCount(userId, withinMinutes = 15) {
  const rows = await sql`
    SELECT count(*)::int AS n
    FROM login_tokens
    WHERE user_id = ${userId}
      AND created_at > now() - (${withinMinutes} || ' minutes')::interval`;
  return rows[0]?.n ?? 0;
}

export async function issueToken(userId) {
  const token = newSecret();
  await sql`
    INSERT INTO login_tokens (token_hash, user_id, expires_at)
    VALUES (${hash(token)}, ${userId}, now() + (${TOKEN_TTL_MIN} || ' minutes')::interval)`;
  return token;
}

/**
 * Spend a token: valid, unexpired and unused ones are marked used and return
 * their user. The UPDATE ... WHERE used_at IS NULL is what makes it single-use
 * even if the link is opened twice at once — the second one matches no row.
 */
export async function consumeToken(token) {
  const rows = await sql`
    UPDATE login_tokens
       SET used_at = now()
     WHERE token_hash = ${hash(token)}
       AND used_at IS NULL
       AND expires_at > now()
    RETURNING user_id`;
  if (!rows.length) return null;

  // Following the link is the proof of mailbox ownership, so this is where the
  // address becomes verified. COALESCE keeps the first verification date.
  const users = await sql`
    UPDATE users
       SET last_login_at = now(),
           email_verified_at = COALESCE(email_verified_at, now())
     WHERE id = ${rows[0].user_id}
    RETURNING id, email, name, workspace, email_verified_at`;
  return users[0] ?? null;
}

/* ------------------------------------------------------------------ *
 * Sessions
 * ------------------------------------------------------------------ */

export async function createSession(userId, userAgent) {
  const secret = newSecret();
  await sql`
    INSERT INTO sessions (session_hash, user_id, expires_at, user_agent)
    VALUES (${hash(secret)}, ${userId},
            now() + (${SESSION_TTL_DAYS} || ' days')::interval,
            ${userAgent ? String(userAgent).slice(0, 300) : null})`;
  return secret;
}

export async function readSession(secret) {
  if (!secret) return null;
  const rows = await sql`
    SELECT u.id, u.email, u.name, u.workspace
      FROM sessions s
      JOIN users u ON u.id = s.user_id
     WHERE s.session_hash = ${hash(secret)}
       AND s.expires_at > now()`;
  return rows[0] ?? null;
}

export async function destroySession(secret) {
  if (!secret) return;
  await sql`DELETE FROM sessions WHERE session_hash = ${hash(secret)}`;
}

/* ------------------------------------------------------------------ *
 * Cookies
 * ------------------------------------------------------------------ */

export function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

/**
 * HttpOnly so page scripts cannot read it (the old localStorage session could
 * be read by anything on the page). SameSite=Lax still arrives on the
 * top-level GET the email link performs, which Strict would block.
 */
export function sessionCookie(secret, { clear = false } = {}) {
  const bits = [
    `${COOKIE}=${clear ? '' : secret}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    clear ? 'Max-Age=0' : `Max-Age=${SESSION_TTL_DAYS * 24 * 60 * 60}`,
  ];
  return bits.join('; ');
}
