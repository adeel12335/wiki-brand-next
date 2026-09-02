import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function PortfolioAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/?timeout=1");
  }

  return children;
}
