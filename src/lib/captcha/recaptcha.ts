export function getRecaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
}

export function getRecaptchaSecretKey(): string {
  return process.env.RECAPTCHA_SECRET_KEY?.trim() ?? "";
}

export function isRecaptchaConfigured(): boolean {
  const site = getRecaptchaSiteKey();
  const secret = getRecaptchaSecretKey();
  if (!site || !secret) return false;
  if (/YOUR_|changeme|placeholder|example/i.test(site)) return false;
  if (/YOUR_|changeme|placeholder|example/i.test(secret)) return false;
  return true;
}

interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
}

/** Verify a Google reCAPTCHA token server-side (v2 checkbox or v3). */
export async function verifyRecaptchaToken(
  token: string,
  remoteIp?: string,
): Promise<RecaptchaVerifyResult> {
  const secret = getRecaptchaSecretKey();
  if (!secret) {
    return { success: false, errorCodes: ["missing-secret"] };
  }

  const trimmed = token.trim();
  if (!trimmed) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", trimmed);
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8000),
      },
    );

    const data = (await response.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    return {
      success: Boolean(data.success),
      score: data.score,
      action: data.action,
      errorCodes: data["error-codes"],
    };
  } catch {
    return { success: false, errorCodes: ["verify-request-failed"] };
  }
}
