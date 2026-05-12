"use client";

import { motion } from "framer-motion";

export default function IntelligenceCore() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/3 backdrop-blur-2xl p-8">

      {/* soft gradient atmosphere */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN STATUS */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="text-base text-zinc-400">
              Current Cognitive State
            </div>

            <h2 className="font-semibold mt-2 tracking-tight">
              Stable, but slightly overloaded
            </h2>

            <p className="text-zinc-300 mt-3 max-w-xl">
              AI detected fragmented attention patterns and elevated mental load due to task switching.
            </p>
          </div>

          {/* soft animated pulse bar */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-2 rounded-full bg-linear-to-r from-cyan-400/60 via-white/40 to-violet-400/40"
          />
        </div>

        {/* METRICS STACK */}
        <div className="space-y-3">
          <Metric label="Mental Load" value="72%" tone="cyan" />
          <Metric label="Focus Stability" value="Moderate" tone="violet" />
          <Metric label="Burnout Risk" value="Low" tone="green" />
        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, tone }: any) {
  const colors: any = {
    cyan: "text-cyan-300",
    violet: "text-violet-300",
    green: "text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-4">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className={`text-lg font-semibold mt-1 ${colors[tone]}`}>
        {value}
      </div>
    </div>
  );
}