import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminEnquiriesList } from "@/components/admin/AdminEnquiriesList";

export default async function AdminEnquiriesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/?timeout=1");
  }

  return <AdminEnquiriesList />;
}
