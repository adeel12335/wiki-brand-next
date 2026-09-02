import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db/mongodb";
import { SITE_NAME } from "@/lib/config";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ timeout?: string; error?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/admin/portfolio/");

  const params = await searchParams;

  async function loginAction(formData: FormData) {
    "use server";
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      await signIn("credentials", {
        username,
        password,
        redirectTo: "/admin/portfolio/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/admin/?error=1");
      }
      throw error;
    }
  }

  if (!isDbConfigured()) {
    return (
      <div className="admin-login-shell">
        <div className="admin-card narrow">
          <h1>Database not configured</h1>
          <p>
            Set <code>MONGODB_URI</code> in <code>.env.local</code>, then run:
          </p>
          <pre>npm run create-admin admin YourPassword</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-panel">
        <div className="admin-login-brand">
          <p className="admin-eyebrow">Secure area</p>
          <h1>{SITE_NAME}</h1>
          <p>
            Sign in to manage portfolio clients, home page features, images, and
            Wikipedia links.
          </p>
          <ul className="admin-login-features">
            <li>Add & edit clients</li>
            <li>Filter & publish items</li>
            <li>Control home page carousel</li>
          </ul>
        </div>

        <div className="admin-card admin-login-card">
          <h2>Admin sign in</h2>
          {params.timeout ? (
            <p className="admin-notice">
              Your session expired. Please sign in again.
            </p>
          ) : null}
          {params.error ? (
            <p className="admin-error" role="alert">
              Invalid username or password. After 8 failed attempts, login is locked
              for 15 minutes.
            </p>
          ) : null}
          <form action={loginAction} className="admin-login-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="admin"
              autoComplete="username"
              required
              autoFocus
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button className="admin-btn admin-login-submit" type="submit">
              Sign in to dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
