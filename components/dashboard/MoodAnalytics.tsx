"use client";

import { motion } from "framer-motion";

export default function MoodEnergyAnalytics() {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/3 backdrop-blur-2xl p-6">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          Mood & Energy Field
        </h2>

        <span className="text-xs text-zinc-500">
          AI inferred signals
        </span>
      </div>

      {/* GRID VISUALIZATION */}
      <div className="mt-6 grid grid-cols-3 gap-4">

        <Metric label="Mood Stability" value="76%" tone="cyan" />
        <Metric label="Energy Level" value="Moderate" tone="violet" />
        <Metric label="Emotional Drift" value="Low" tone="emerald" />

      </div>

      {/* FAKE NEURAL GRAPH */}
      <div className="mt-6 relative h-28 overflow-hidden rounded-2xl border border-white/10 bg-black/20">

        <motion.div
          animate={{
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-linear-to-r from-cyan-400/10 via-transparent to-violet-400/10"
        />

        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-white/5"
              />
            ))}
          </div>
        </div>
      </div>

      {/* INSIGHT */}
      <p className="text-sm text-zinc-500 mt-4">
        Your energy peaks in short bursts. AI recommends structured 45-minute deep work cycles.
      </p>
    </div>
  );
}

function Metric({ label, value, tone }: any) {
  const colors: any = {
    cyan: "text-cyan-300",
    violet: "text-violet-300",
    emerald: "text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-4">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className={`text-lg font-semibold mt-1 ${colors[tone]}`}>
        {value}
      </div>
    </div>
  );
}