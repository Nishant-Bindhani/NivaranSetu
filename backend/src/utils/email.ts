import { google } from 'googleapis'
import { config } from '@config/env.js'

// Gmail REST API over HTTPS, not SMTP — Render's free tier blocks outbound
// SMTP ports (25/465/587) entirely as of a Sept 2025 policy change; no
// SMTP-level fix (IPv4, IPv6, DNS resolution) can work around a network-level
// port block. The Gmail API sends over the same port (443) as any normal
// website request, which isn't blocked. See NOTES.md Section 96/97 for the
// two earlier SMTP-based attempts that didn't actually fix this.
//
// Auth: a SEPARATE, dedicated OAuth client (GMAIL_SENDER_CLIENT_ID/SECRET,
// its own Google Cloud project) from GOOGLE_CLIENT_ID — that one is for
// Sign-in-with-Google (a user-facing feature); this one is only ever
// authorized once, by the project owner, for nivaransetu.noreply@gmail.com
// to send mail. GMAIL_REFRESH_TOKEN was obtained via a one-time interactive
// script (deleted after use) and never expires unless revoked.
const oauth2Client = new google.auth.OAuth2(config.GMAIL_SENDER_CLIENT_ID, config.GMAIL_SENDER_CLIENT_SECRET)
oauth2Client.setCredentials({ refresh_token: config.GMAIL_REFRESH_TOKEN })

const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

const COLORS = {
  primary: '#900007',
  background: '#fbf8f1',
  foreground: '#1a1512',
  mutedForeground: '#6a615b',
  border: '#ddd6cd',
}

const FONT_STACK = "'Segoe UI', Helvetica, Arial, sans-serif"

// Code display, not a clickable link/button — a link can be silently
// "clicked" by an email client's link-safety scanner before the real user
// does, burning a single-use token. A code the user has to type in by hand
// can't be prefetched that way.
function buildEmailHtml(heading: string, body: string, code: string) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:${COLORS.border}; font-family:${FONT_STACK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.border}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:${COLORS.background}; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="background-color:${COLORS.primary}; padding:28px 32px;">
                <span style="font-family:${FONT_STACK}; font-size:20px; font-weight:700; color:#ffffff;">NivaranSetu</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <h1 style="margin:0 0 12px; font-family:${FONT_STACK}; font-size:22px; font-weight:700; color:${COLORS.foreground};">
                  ${heading}
                </h1>
                <p style="margin:0 0 28px; font-family:${FONT_STACK}; font-size:15px; line-height:1.6; color:${COLORS.mutedForeground};">
                  ${body}
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="border-radius:8px; background-color:${COLORS.background}; border:1px solid ${COLORS.border}; padding:20px;">
                      <span style="font-family:${FONT_STACK}; font-size:32px; font-weight:700; letter-spacing:8px; color:${COLORS.foreground};">${code}</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:20px 0 0; font-family:${FONT_STACK}; font-size:13px; line-height:1.6; color:${COLORS.mutedForeground};">
                  This code expires in 10 minutes.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; border-top:1px solid ${COLORS.border};">
                <p style="margin:0; font-family:${FONT_STACK}; font-size:12px; color:${COLORS.mutedForeground};">
                  If you didn't request this, you can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim()
}

// The Gmail API doesn't take {to, subject, html} as separate fields — it
// wants the ENTIRE email (headers + body) as one raw RFC 2822 MIME message,
// base64url-encoded. This builds that raw message by hand.
function buildRawMessage(to: string, subject: string, html: string) {
  const message = [
    `From: NivaranSetu <${config.GMAIL_USER}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ].join('\r\n')

  return Buffer.from(message).toString('base64url')
}

async function sendGmail(to: string, subject: string, html: string) {
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: buildRawMessage(to, subject, html) },
  })
}

export async function sendVerificationEmail(to: string, code: string) {
  await sendGmail(
    to,
    'Verify your NivaranSetu account',
    buildEmailHtml(
      'Verify your email',
      "You're almost set. Enter this code to verify your email and activate your NivaranSetu account.",
      code,
    ),
  )
}

export async function sendPasswordResetEmail(to: string, code: string) {
  await sendGmail(
    to,
    'Reset your NivaranSetu password',
    buildEmailHtml(
      'Reset your password',
      'We received a request to reset your NivaranSetu password. Enter this code to choose a new one.',
      code,
    ),
  )
}
