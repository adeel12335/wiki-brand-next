import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {
  SITE_NAME,
  SITE_TAGLINE,
  PRODUCTION_SITE_URL,
  getSiteUrl,
} from "@/lib/config";
import "./(site)/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a2030" },
    { media: "(prefers-color-scheme: dark)", color: "#04101c" },
  ],
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  alternates: {
    types: {
      "application/rss+xml": `${PRODUCTION_SITE_URL}/feed.xml`,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    other: {
      "msvalidate.01": "719D546839CD6AF6A6EACB7EF0A7C23E",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${manrope.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
