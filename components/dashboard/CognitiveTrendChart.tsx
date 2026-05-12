"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", load: 60, label: "Stable" },
  { day: "Tue", load: 72, label: "Rising load" },
  { day: "Wed", load: 68, label: "Slight recovery" },
  { day: "Thu", load: 80, label: "Peak overload" },
  { day: "Fri", load: 75, label: "High stress" },
  { day: "Sat", load: 55, label: "Recovery" },
  { day: "Sun", load: 50, label: "Restored" },
];

export default function CognitiveTrendChart() {
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];

  const trend =
    latest.load < prev.load ? "Improving" : "Increasing Load";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-6">

      {/* HEADER WITH MEANING */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl! mb-2 font-medium">
            Cognitive Load Trend
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            AI detects your mental workload pattern across 7 days
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm text-cyan-300">
            {trend}
          </div>

          <div className="text-xs text-zinc-500">
            Current: {latest.load}/100
          </div>
        </div>
      </div>

      {/* INSIGHT STRIP */}
      <div className="mt-4 text-sm text-zinc-400">
        {latest.label === "Peak overload"
          ? "You reached a cognitive peak on Thursday. AI recommends reducing task switching."
          : "Your cognitive load is stabilizing after mid-week spike."}
      </div>

      {/* CHART */}
      <div className="h-45 mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="load" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#7DD3FC" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="day" stroke="#666" />

            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="load"
              stroke="#7DD3FC"
              fill="url(#load)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI ACTION */}
      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300">
        💡 AI Suggestion: Schedule deep work sessions on low-load days (Sat–Sun).
      </div>
    </div>
  );
}