import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
import { config } from '@config/env.js'

// `family` (force IPv4) is a real Node net.connect/tls.connect option
// nodemailer passes through, but @types/nodemailer doesn't declare it —
// the `as` cast is only working around that types-package gap, not
// bypassing real validation.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  // Render's network can't reach Gmail over IPv6 (ENETUNREACH) — the
  // connection attempt hangs for minutes before failing. Forcing IPv4
  // avoids the unreachable route entirely.
  family: 4,
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_APP_PASSWORD,
  },
} as SMTPTransport.Options)

const COLORS = {
  primary: '#900007',
  background: '#fbf8f1',
  foreground: '#1a1512',
  mutedForeground: '#6a615b',
  border: '#ddd6cd',
}

const FONT_STACK = "'Segoe UI', Helvetica, Arial, sans-serif"

function buildEmailHtml(heading: string, body: string, buttonLabel: string, link: string) {
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
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px; background-color:${COLORS.primary};">
                      <a href="${link}" style="display:inline-block; padding:12px 28px; font-family:${FONT_STACK}; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none;">
                        ${buttonLabel}
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:28px 0 0; font-family:${FONT_STACK}; font-size:13px; line-height:1.6; color:${COLORS.mutedForeground};">
                  Or copy and paste this link into your browser:<br />
                  <a href="${link}" style="color:${COLORS.primary}; word-break:break-all;">${link}</a>
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

export async function sendVerificationEmail(to: string, link: string) {
  await transporter.sendMail({
    from: config.GMAIL_USER,
    to,
    subject: 'Verify your NivaranSetu account',
    html: buildEmailHtml(
      'Verify your email',
      "You're almost set. Click the button below to verify your email and activate your NivaranSetu account.",
      'Verify email',
      link,
    ),
  })
}

export async function sendPasswordResetEmail(to: string, link: string) {
  await transporter.sendMail({
    from: config.GMAIL_USER,
    to,
    subject: 'Reset your NivaranSetu password',
    html: buildEmailHtml(
      'Reset your password',
      "We received a request to reset your NivaranSetu password. Click the button below to choose a new one.",
      'Reset password',
      link,
    ),
  })
}
