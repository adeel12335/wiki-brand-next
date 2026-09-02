import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { SITE_NAME } from "@/lib/config";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="admin-body">
      {session ? (
        <header className="admin-bar">
          <Link className="admin-brand" href="/admin/portfolio/">
            <span className="admin-brand-mark">WS</span>
            <span>
              <b>{SITE_NAME}</b>
              <small>Admin dashboard</small>
            </span>
          </Link>
          <nav className="admin-nav">
            <Link href="/admin/portfolio/">Portfolio</Link>
            <a href="/portfolio/" target="_blank" rel="noopener noreferrer">
              View site ↗
            </a>
            <span className="admin-user">{session.user?.name}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/" });
              }}
            >
              <button className="admin-btn ghost small" type="submit">
                Sign out
              </button>
            </form>
          </nav>
        </header>
      ) : null}
      <main className="admin-main">{children}</main>
    </div>
  );
}
