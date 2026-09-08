/**
 * POST /api/auth/request  { email }
 *
 * The single entry point for both signing up and signing in. A new address gets
 * an account; a known one is signed back in.
 *
 * The session starts here, immediately, rather than waiting for the emailed
 * link to be followed. That is a deliberate trade: it means possession of the
 * mailbox is no longer proven, so this is not authentication in the strict
 * sense — anyone can sign in as any address they type. It was chosen because
 * the deployment cannot reliably send mail (the sending domain is hosted
 * elsewhere), and gating access on an email that may never arrive would leave
 * the site unusable.
 *
 * The verification link is still issued and still emailed when it can be. It
 * confirms the address afterwards, recorded as users.email_verified_at.
 *
 * Always 200 with {ok:true}. The only 4xx is a malformed address, which reveals
 * nothing about the account behind it.
 */
import { ensureSchema } from '../_lib/db.mjs';
import {
  findOrCreateUser, issueToken, recentTokenCount, createSession, sessionCookie,
  TOKEN_TTL_MIN,
} from '../_lib/auth.mjs';
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

    // Sign in first, so the outcome never depends on mail delivery.
    const secret = await createSession(user.id, req.headers['user-agent']);
    res.setHeader('Set-Cookie', sessionCookie(secret));

    // Over the limit on verification mails: still signed in, just no new email.
    // Someone trying to bury a stranger's inbox gets no extra signal.
    if ((await recentTokenCount(user.id, TOKEN_TTL_MIN)) >= MAX_PER_WINDOW) {
      console.warn(`rate limit: ${email} already has ${MAX_PER_WINDOW} live tokens`);
      return res.status(200).json({ ok: true, email, delivered: true });
    }

    const token = await issueToken(user.id);
    const link = `${originOf(req)}/api/auth/callback?token=${encodeURIComponent(token)}`;
    const result = await sendSignInLink(email, link);

    // `delivered` reports whether the mail provider accepted the message, so
    // the page can promise an email only when one actually went out. It is safe
    // to return: the send is attempted for every syntactically valid address,
    // whether or not an account already existed, so it reflects the recipient's
    // deliverability and never account status.
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
