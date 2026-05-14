"use client";

import { motion } from "framer-motion";
import type { DashboardSummary } from "@/lib/dashboard/types";

export default function IntelligenceCore({
  data,
}: {
  data: DashboardSummary["intelligence"];
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/3 p-8 backdrop-blur-2xl">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="text-base text-zinc-400">Current Mental State</div>

            <h2 className="mt-4 text-[2.75rem]! font-semibold tracking-tight">
              {data.state}
            </h2>

            <p className="mt-3 max-w-xl text-zinc-300">
              {data.explanation}
            </p>
          </div>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-2 rounded-full bg-linear-to-r from-cyan-400/60 via-white/40 to-violet-400/40"
          />
        </div>

        <div className="space-y-3">
          <Metric label="Mental Load" value={`${data.mentalLoad}%`} tone="cyan" />
          <Metric label="Focus Stability" value={data.focusStability} tone="violet" />
          <Metric label="Burnout Risk" value={data.burnoutRisk} tone="green" />
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "cyan" | "violet" | "green";
}) {
  const colors = {
    cyan: "text-cyan-300",
    violet: "text-violet-300",
    green: "text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-4">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${colors[tone]}`}>
        {value}
      </div>
    </div>
  );
}