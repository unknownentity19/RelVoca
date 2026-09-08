/**
 * GET /api/auth/health
 *
 * Is the auth stack configured, and can it reach the database?
 *
 * /api/auth/request deliberately answers the same way whether the mail was sent,
 * rate-limited or rejected — that is what stops it being used to discover which
 * addresses have accounts. The cost is that a misconfigured deployment looks
 * exactly like a working one from the outside, which is not debuggable.
 *
 * This reports *presence*, never values: whether each variable is set, which
 * from-address is in use, and whether a trivial query succeeds. It says nothing
 * about any user, so it adds no enumeration surface.
 */
import { sql } from '../_lib/db.mjs';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const out = {
    database_url_set: !!process.env.DATABASE_URL,
    resend_api_key_set: !!process.env.RESEND_API_KEY,
    mail_from: process.env.MAIL_FROM || 'RelVoca <onboarding@resend.dev>',
    auth_origin: process.env.AUTH_ORIGIN || '(derived from request host)',
    database_reachable: false,
  };

  try {
    await sql`SELECT 1`;
    out.database_reachable = true;
  } catch (err) {
    out.database_error = err.message;
  }

  return res.status(200).json(out);
}
