export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

export function getTurnstileSecretKey(): string {
  return process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
}

export function isTurnstileConfigured(): boolean {
  const site = getTurnstileSiteKey();
  const secret = getTurnstileSecretKey();
  if (!site || !secret) return false;
  if (/YOUR_|changeme|placeholder|example/i.test(site)) return false;
  if (/YOUR_|changeme|placeholder|example/i.test(secret)) return false;
  return true;
}

interface TurnstileVerifyResult {
  success: boolean;
  errorCodes?: string[];
}

/** Verify a Cloudflare Turnstile token server-side. */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerifyResult> {
  const secret = getTurnstileSecretKey();
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
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8000),
      },
    );

    const data = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    return {
      success: Boolean(data.success),
      errorCodes: data["error-codes"],
    };
  } catch {
    return { success: false, errorCodes: ["verify-request-failed"] };
  }
}
