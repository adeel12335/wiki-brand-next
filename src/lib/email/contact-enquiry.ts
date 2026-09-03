import { SITE_EMAIL, SITE_NAME, getSiteUrl } from "@/lib/config";

export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

export function buildContactEnquiryText(data: ContactEnquiryPayload): string {
  return `New enquiry from ${SITE_NAME}

Name:    ${data.name}
Email:   ${data.email}
Phone:   ${data.phone || "—"}
Subject: ${data.subject || "—"}

Message:
${data.message}
`;
}

/** Editorial HTML email for new contact form submissions. */
export function buildContactEnquiryHtml(data: ContactEnquiryPayload): string {
  const site = getSiteUrl();
  const subject = data.subject?.trim() || "General enquiry";
  const phone = data.phone?.trim() || "Not provided";
  const receivedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date());

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Website enquiry — ${escapeHtml(SITE_NAME)}</title>
</head>
<body style="margin:0;padding:0;background:#061018;color:#e8eef3;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#061018;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border:1px solid rgba(216,165,58,.28);background:linear-gradient(165deg,#0c2434,#071820);">
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid rgba(216,165,58,.18);">
              <p style="margin:0 0 8px;color:#d4a53a;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">
                Editorial desk · New enquiry
              </p>
              <h1 style="margin:0;color:#f4f7fa;font-size:28px;font-weight:500;line-height:1.2;">
                ${escapeHtml(SITE_NAME)}
              </h1>
              <p style="margin:10px 0 0;color:#9aa7b2;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;">
                A visitor submitted the contact form on
                <a href="${escapeHtml(site)}" style="color:#e0b45a;text-decoration:none;">${escapeHtml(site.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:0 0 18px;border-bottom:1px solid rgba(216,165,58,.12);">
                    <p style="margin:0 0 4px;color:#8b98a3;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;">From</p>
                    <p style="margin:0;color:#f4f7fa;font-size:18px;">${escapeHtml(data.name)}</p>
                    <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color:#e0b45a;text-decoration:none;">${escapeHtml(data.email)}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 0;border-bottom:1px solid rgba(216,165,58,.12);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" valign="top" style="padding-right:12px;">
                          <p style="margin:0 0 4px;color:#8b98a3;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Subject</p>
                          <p style="margin:0;color:#f4f7fa;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escapeHtml(subject)}</p>
                        </td>
                        <td width="50%" valign="top" style="padding-left:12px;">
                          <p style="margin:0 0 4px;color:#8b98a3;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Phone</p>
                          <p style="margin:0;color:#f4f7fa;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escapeHtml(phone)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 0 8px;">
                    <p style="margin:0 0 10px;color:#8b98a3;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;">Message</p>
                    <div style="padding:18px 20px;border-left:2px solid #d4a53a;background:rgba(216,165,58,.06);color:#dce4ea;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;">
                      ${formatMultiline(data.message)}
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;">
                <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: ${subject}`)}"
                   style="display:inline-block;padding:12px 22px;background:#d4a53a;color:#0a1c28;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.04em;text-decoration:none;">
                  Reply to ${escapeHtml(data.name)}
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid rgba(216,165,58,.14);">
              <p style="margin:0;color:#6f7d88;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;">
                Received ${escapeHtml(receivedAt)} UTC · Reply goes to the sender · Inbox:
                <a href="mailto:${escapeHtml(SITE_EMAIL)}" style="color:#b08a3a;text-decoration:none;">${escapeHtml(SITE_EMAIL)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function isResendConfigured(): boolean {
  const key = process.env.RESEND_API_KEY?.trim() ?? "";
  if (!key) return false;
  if (/YOUR_RESEND|changeme|placeholder|example/i.test(key)) return false;
  return key.startsWith("re_");
}
