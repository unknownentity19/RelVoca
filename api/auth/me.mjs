/**
 * GET /api/auth/me
 *
 * Who, if anyone, is signed in. Every page calls this to decide which nav state
 * to paint, so it answers 200 with {user:null} for anonymous visitors rather
 * than 401 — being signed out is a normal answer here, not an error.
 */
import { ensureSchema } from '../_lib/db.mjs';
import { parseCookies, readSession, COOKIE } from '../_lib/auth.mjs';

export default async function handler(req, res) {
  // Per-user data must not be cached by the CDN or shared between visitors.
  res.setHeader('Cache-Control', 'no-store, private');

  const secret = parseCookies(req)[COOKIE];
  if (!secret) return res.status(200).json({ user: null });

  try {
    await ensureSchema();
    const user = await readSession(secret);
    return res.status(200).json({ user: user || null });
  } catch (err) {
    console.error('auth/me failed:', err);
    // Treat an outage as signed-out rather than breaking every page's nav.
    return res.status(200).json({ user: null });
  }
}
