import type { DashboardSummary } from "@/lib/dashboard/types";

export default function FocusSession({
  data,
}: {
  data: DashboardSummary["focus"];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-8">
      <h2 className="text-3xl! font-medium">Focus Session</h2>

      <div className="mt-6 flex items-center justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10">
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-cyan-400/20 to-violet-400/20 animate-pulse" />

          <div className="z-10 text-center">
            <div className="text-3xl font-semibold">
              {data.totalFocusMinutes}m
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              focused today
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/4 p-4 text-center">
        <div className="text-sm text-zinc-500">Suggested next focus</div>
        <div className="mt-1 font-medium text-white">
          {data.activeTaskTitle ?? "No active task right now"}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        {data.completedSessions} completed guided sessions today.
      </p>
    </div>
  );
}