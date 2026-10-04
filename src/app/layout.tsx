import type { Metadata, Viewport } from "next";
import { Inter, Merriweather_Sans } from "next/font/google";
import {
  SITE_NAME,
  SITE_TAGLINE,
  PRODUCTION_SITE_URL,
  getSiteUrl,
} from "@/lib/config";

const headingFont = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    // Shorter brand suffix so SERP titles stay near ~55–60 characters.
    template: "%s | Wikipedia Studio",
  },
  description: SITE_TAGLINE,
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default",
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

export const viewport: Viewport = {
  themeColor: "#1f5f61",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
