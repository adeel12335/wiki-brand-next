import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  SITE_NAME,
  SITE_TAGLINE,
  PRODUCTION_SITE_URL,
  getSiteUrl,
} from "@/lib/config";
import "./(site)/globals.css";

const segoeUi = localFont({
  src: [
    { path: "./fonts/segoe-ui/SegoeUI-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/segoe-ui/SegoeUI.woff2", weight: "400", style: "normal" },
    { path: "./fonts/segoe-ui/SegoeUI-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/segoe-ui/SegoeUI-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/segoe-ui/SegoeUI-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-segoe",
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
      className={segoeUi.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
