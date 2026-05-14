"use client";

import type { Point } from "@/lib/dashboard/types";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ReferenceLine,
} from "recharts";

export default function BurnoutPulseChart({ data }: { data: Point[] }) {
  const latest = data[data.length - 1] ?? { day: "Today", risk: 0 };

  const risk =
    latest.risk >= 75 ? "High" : latest.risk >= 45 ? "Moderate" : "Low";

  const insight =
    risk === "High"
      ? "Burnout signs are elevated. Mindrift recommends a lighter schedule today."
      : risk === "Moderate"
      ? "Some stress signs are showing. Shorter tasks and breaks will help."
      : "Burnout risk is low right now. Keep your pace steady.";

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 p-6">
      <div className="absolute inset-0 bg-linear-to-br from-violet-400/5 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-3xl! font-medium text-white">
              Burnout Signal
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Based on stress language, workload, and completion patterns.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <div
              className={
                risk === "High"
                  ? "text-red-300"
                  : risk === "Moderate"
                  ? "text-orange-300"
                  : "text-emerald-300"
              }
            >
              {risk}
            </div>
            <div className="text-xs text-zinc-500">
              Score: {latest.risk}/100
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
          {insight}
        </div>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#71717a" tickLine={false} axisLine={false} />

              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.1)" }}
                contentStyle={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  color: "#fff",
                }}
              />

              <ReferenceLine y={75} stroke="rgba(248,113,113,0.35)" strokeDasharray="4 4" />
              <ReferenceLine y={45} stroke="rgba(251,191,36,0.25)" strokeDasharray="4 4" />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#A78BFA"
                strokeWidth={3}
                dot={{ r: 3, fill: "#A78BFA" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/3 p-4 text-sm text-zinc-300">
          Mindrift tip: If this rises, use Rescue Mode or create a lighter plan.
        </div>
      </div>
    </section>
  );
}