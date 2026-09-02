import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { cacheGet, cacheSet } from "@/lib/cache/redis";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";
import { services } from "@/lib/data";

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
});

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateKey = `contact:rate:${ip}`;
  const attempts = (await cacheGet<number>(rateKey)) ?? 0;
  if (attempts >= 3) {
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO || SITE_EMAIL;

  const text = `New enquiry from ${SITE_NAME}

Name:    ${data.name}
Email:   ${data.email}
Phone:   ${data.phone || "—"}
Subject: ${data.subject || "—"}

Message:
${data.message}
`;

  const { error } = await resend.emails.send({
    from: `${SITE_NAME} <${SITE_EMAIL}>`,
    to,
    replyTo: data.email,
    subject: `Website enquiry: ${data.subject || "General"}`,
    text,
  });

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  await cacheSet(rateKey, attempts + 1, 3600);

  return NextResponse.json({ ok: true });
}
