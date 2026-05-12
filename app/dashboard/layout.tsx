import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-full text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="h-full shrink-0">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP NAVBAR */}
        <TopNavbar user={user} />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10 max-w-350 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}