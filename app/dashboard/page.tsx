"use client";

import AIRecommendations from "@/components/dashboard/AIRecommendations";
import CognitiveTrendChart from "@/components/dashboard/CognitiveTrendChart";
import BurnoutPulseChart from "@/components/dashboard/BurnoutPulseChart";
import FocusSession from "@/components/dashboard/FocusSession";
import IntelligenceCore from "@/components/dashboard/IntelligenceCore";
import TodayPriorities from "@/components/dashboard/TodayPriorities";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl! font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-zinc-400 mt-2">
          Your cognitive state, organized in real time.
        </p>
      </div>

      <IntelligenceCore />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CognitiveTrendChart />
        <BurnoutPulseChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRecommendations />
        <FocusSession />
      </div>

      <TodayPriorities />
    </div>
  );
}

// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // extra protection
//   if (!user) {
//     redirect("/login");
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold">
//         Welcome back, {user.email}
//       </h1>
//     </div>
//   );
// }