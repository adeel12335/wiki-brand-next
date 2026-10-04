import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IconLibrary } from "@/components/ui/Icon";
import "./globals.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <IconLibrary />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
