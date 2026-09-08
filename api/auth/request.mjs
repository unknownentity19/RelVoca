/**
 * POST /api/auth/request  { email }
 *
 * The single entry point for both signing up and signing in. A new address gets
 * an account; a known one just gets a link. The response is identical either
 * way, and identical again when the address is rate-limited or the email fails
 * to send — so this endpoint cannot be used to discover who has an account.
 *
 * Always 200 with {ok:true}. The only 4xx is a malformed address, which reveals
 * nothing about the account behind it.
 */
import { ensureSchema } from '../_lib/db.mjs';
import { findOrCreateUser, issueToken, recentTokenCount, TOKEN_TTL_MIN } from '../_lib/auth.mjs';
import { sendSignInLink } from '../_lib/email.mjs';

const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/;
const MAX_PER_WINDOW = 3; // links per address per TOKEN_TTL_MIN

/** The origin that served the page, so links work on preview and production alike. */
function originOf(req) {
  if (process.env.AUTH_ORIGIN) return process.env.AUTH_ORIGIN.replace(/\/+$/, '');
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  return `${proto}://${host}`;
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = '';
  for await (const chunk of req) raw += chunk;
  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { email: raw } = await readJson(req);
  const email = String(raw || '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  try {
    await ensureSchema();
    const user = await findOrCreateUser(email);

    // Over the limit: stop, but answer exactly as if a link had been sent.
    // Someone trying to bury a stranger's inbox gets no signal either way.
    if ((await recentTokenCount(user.id, TOKEN_TTL_MIN)) >= MAX_PER_WINDOW) {
      console.warn(`rate limit: ${email} already has ${MAX_PER_WINDOW} live tokens`);
      return res.status(200).json({ ok: true, email, delivered: true });
    }

    const token = await issueToken(user.id);
    const link = `${originOf(req)}/api/auth/callback?token=${encodeURIComponent(token)}`;
    const result = await sendSignInLink(email, link);

    // `delivered` reports whether the mail provider accepted the message. It is
    // safe to return: the send is attempted for every syntactically valid
    // address, whether or not an account already existed, so the outcome
    // depends on the recipient's deliverability and never on account status.
    //
    // Without it the page says "check your email" after a rejected send and the
    // visitor waits for a message that was never sent — which is exactly what
    // happens on a fresh Resend account, where the shared sender only delivers
    // to the account owner until a domain is verified.
    return res.status(200).json({
      ok: true,
      email,
      delivered: result.sent,
      reason: result.sent ? undefined : result.reason,
    });
  } catch (err) {
    console.error('auth/request failed:', err);
    return res.status(500).json({ error: 'server_error' });
  }
}
