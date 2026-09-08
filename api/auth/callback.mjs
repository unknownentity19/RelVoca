/**
 * GET /api/auth/callback?token=...
 *
 * Where the emailed link lands. Spends the token, starts a session, sets the
 * cookie and redirects into the app. A bad, expired or already-used token goes
 * back to /login with a reason the page can explain, rather than showing a raw
 * error — the usual cause is someone opening a link twice, which is expected.
 */
import { ensureSchema } from '../_lib/db.mjs';
import { consumeToken, createSession, sessionCookie } from '../_lib/auth.mjs';

function redirect(res, to) {
  res.statusCode = 302;
  res.setHeader('Location', to);
  // A sign-in response must never be cached by a proxy or the browser.
  res.setHeader('Cache-Control', 'no-store');
  return res.end();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const token = new URL(req.url, 'http://localhost').searchParams.get('token');
  if (!token) return redirect(res, '/login?error=missing_token');

  try {
    await ensureSchema();

    const user = await consumeToken(token);
    if (!user) {
      // Expired, already spent, or never valid — all the same to the visitor.
      return redirect(res, '/login?error=link_expired');
    }

    const secret = await createSession(user.id, req.headers['user-agent']);
    res.setHeader('Set-Cookie', sessionCookie(secret));
    return redirect(res, '/dashboard');
  } catch (err) {
    console.error('auth/callback failed:', err);
    return redirect(res, '/login?error=server_error');
  }
}
