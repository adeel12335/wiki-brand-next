import { Open_Sans } from "next/font/google";
import { AosProvider } from "@/components/providers/AosProvider";
import { TrustBar } from "@/components/module/TrustBar";
import { Header } from "@/components/module/Header";
import { Footer } from "@/components/module/Footer";
import "@/styles/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

/** Public site shell. Styles + fonts load here only, so /admin keeps its own CSS. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${openSans.variable} font-sans overflow-x-clip`}>
      <AosProvider>
        <TrustBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </AosProvider>
    </div>
  );
}
