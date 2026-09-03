import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteScripts } from "@/components/layout/SiteScripts";
import { IconLibrary } from "@/components/ui/Icon";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <IconLibrary />
      <canvas id="starfield" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <SiteScripts />
    </>
  );
}
