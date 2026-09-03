import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { cacheGet, cacheSet } from "@/lib/cache/redis";
import {
  isRecaptchaConfigured,
  verifyRecaptchaToken,
} from "@/lib/captcha/recaptcha";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";
import { services } from "@/lib/data";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { ContactEnquiry } from "@/lib/db/models";
import {
  buildContactEnquiryHtml,
  buildContactEnquiryText,
  isResendConfigured,
} from "@/lib/email/contact-enquiry";

const subjectOptions = [
  ...Object.values(services).map((s) => s.name),
  "Notability assessment",
  "Something else",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least a sentence or two about the subject.")
    .max(4000),
  website: z.string().optional(),
  captchaToken: z.string().optional().or(z.literal("")),
});

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function mailFallbackMessage(): string {
  return `We could not save that enquiry. Please email ${SITE_EMAIL} directly.`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateKey = `contact:rate:${ip}`;
  const attempts = (await cacheGet<number>(rateKey)) ?? 0;
  if (attempts >= 5) {
    return NextResponse.json(
      { errors: { form: "Too many submissions. Please try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: { form: "Invalid request." } },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      errors[key] = issue.message;
    }
    return NextResponse.json({ errors }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json(
      {
        errors: {
          form: "This submission looked automated. Please email us directly instead.",
        },
      },
      { status: 400 },
    );
  }

  if (data.subject && !subjectOptions.includes(data.subject)) {
    return NextResponse.json(
      { errors: { subject: "Please choose one of the listed options." } },
      { status: 400 },
    );
  }

  if (isRecaptchaConfigured()) {
    const captcha = await verifyRecaptchaToken(data.captchaToken ?? "", ip);
    if (!captcha.success) {
      return NextResponse.json(
        {
          errors: {
            captcha: "Captcha verification failed. Please try again.",
          },
        },
        { status: 400 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn(
      "reCAPTCHA is not configured. Contact form is running without captcha.",
    );
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, errors: { form: mailFallbackMessage() } },
      { status: 503 },
    );
  }

  let enquiryId: string | null = null;
  let emailSent = false;

  try {
    await connectDB();
    const enquiry = await ContactEnquiry.create({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject || "",
      message: data.message,
      ip: ip.slice(0, 64),
      status: "new",
      emailSent: false,
    });
    enquiryId = enquiry._id.toString();
  } catch (error) {
    console.error("Contact enquiry save failed:", error);
    return NextResponse.json(
      { ok: false, errors: { form: mailFallbackMessage() } },
      { status: 502 },
    );
  }

  if (isResendConfigured()) {
    const resend = new Resend(process.env.RESEND_API_KEY!.trim());
    const to = (process.env.CONTACT_TO || SITE_EMAIL).trim();
    const fromEmail = (process.env.CONTACT_FROM || SITE_EMAIL).trim();
    const subjectLine = `Website enquiry: ${data.subject || "General"}`;

    try {
      const { error } = await resend.emails.send({
        from: `${SITE_NAME} <${fromEmail}>`,
        to,
        replyTo: data.email,
        subject: subjectLine,
        text: buildContactEnquiryText(data),
        html: buildContactEnquiryHtml(data),
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        emailSent = true;
        if (enquiryId) {
          await ContactEnquiry.updateOne(
            { _id: enquiryId },
            { $set: { emailSent: true } },
          ).catch(() => undefined);
        }
      }
    } catch (error) {
      console.error("Contact email send failed:", error);
    }
  }

  await cacheSet(rateKey, attempts + 1, 3600);

  return NextResponse.json({ ok: true, emailSent, id: enquiryId });
}
