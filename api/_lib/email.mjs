/**
 * Sending the sign-in link.
 *
 * Resend's shared sender, onboarding@resend.dev, only delivers to the address
 * the Resend account was created with; sending anywhere else returns 403 until
 * a domain is verified. That is the default here, so a fresh install works for
 * the owner immediately. Set MAIL_FROM once a domain is verified to reach
 * anyone else.
 *
 * A send failure is never fatal. The link is written to the function log (which
 * only the project owner can read) so testing is still possible, and the caller
 * still returns the same neutral response — a delivery problem must not become
 * a way to probe which addresses exist.
 */
import { Resend } from 'resend';

const FROM = process.env.MAIL_FROM || 'RelVoca <onboarding@resend.dev>';
const client = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function body(link) {
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:460px;margin:0 auto;padding:32px 24px;color:#12161b">
  <div style="width:40px;height:40px;border-radius:11px;background:#397dff;display:flex;align-items:center;justify-content:center;margin-bottom:20px">
    <span style="color:#fff;font-weight:700;font-size:17px">R</span>
  </div>
  <h1 style="font-size:20px;line-height:28px;margin:0 0 8px">Sign in to RelVoca</h1>
  <p style="font-size:14px;line-height:21px;color:#5a6673;margin:0 0 24px">
    Click the button below to sign in. The link works once and expires in 15 minutes.
  </p>
  <a href="${link}" style="display:inline-block;background:#397dff;color:#fff;text-decoration:none;border-radius:10px;padding:13px 22px;font-size:14px;font-weight:600">Sign in to RelVoca</a>
  <p style="font-size:12px;line-height:18px;color:#8a97a5;margin:24px 0 0">
    If you did not request this, you can ignore this email &mdash; nobody can sign in without the link.
  </p>
  <p style="font-size:12px;line-height:18px;color:#8a97a5;margin:12px 0 0;word-break:break-all">
    Or paste this into your browser:<br>${link}
  </p>
</div>`;
}

export async function sendSignInLink(to, link) {
  if (!client) {
    console.warn(`RESEND_API_KEY not set. Sign-in link for ${to}: ${link}`);
    return { sent: false, reason: 'no-api-key' };
  }

  try {
    const { error } = await client.emails.send({
      from: FROM,
      to,
      subject: 'Sign in to RelVoca',
      html: body(link),
    });
    if (error) throw new Error(error.message || JSON.stringify(error));
    return { sent: true };
  } catch (err) {
    // Most commonly the resend.dev 403: recipient is not the account owner.
    console.error(`Could not email ${to}: ${err.message}`);
    console.warn(`Sign-in link for ${to}: ${link}`);
    return { sent: false, reason: err.message };
  }
}
