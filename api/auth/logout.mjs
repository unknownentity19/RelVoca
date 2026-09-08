/**
 * POST /api/auth/logout
 *
 * Deletes the session row and clears the cookie. Deleting server-side matters:
 * clearing only the cookie would leave a session that still works for anyone
 * who captured the value.
 */
import { ensureSchema } from '../_lib/db.mjs';
import { parseCookies, destroySession, sessionCookie, COOKIE } from '../_lib/auth.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const secret = parseCookies(req)[COOKIE];
  try {
    if (secret) {
      await ensureSchema();
      await destroySession(secret);
    }
  } catch (err) {
    // Still clear the cookie — the visitor asked to be signed out.
    console.error('auth/logout failed:', err);
  }

  res.setHeader('Set-Cookie', sessionCookie('', { clear: true }));
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true });
}
