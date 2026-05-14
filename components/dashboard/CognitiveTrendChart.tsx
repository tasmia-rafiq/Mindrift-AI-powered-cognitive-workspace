"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

type Point = {
  day: string;
  load: number;
};

export default function CognitiveTrendChart({ data }: { data: Point[] }) {
  const latest = data[data.length - 1] ?? { day: "Today", load: 0 };
  const prev = data[data.length - 2] ?? latest;

  const trend = latest.load <= prev.load ? "Improving" : "Increasing";

  const insight =
    latest.load >= 75
      ? "Your mental load is high. Keep today lighter and avoid task switching."
      : latest.load >= 45
      ? "Your mental load is moderate. One guided focus block can help reduce pressure."
      : "Your mental load is currently manageable. Good time for calm progress.";

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 p-6">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/5 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-3xl! font-medium text-white">
              Mental Load Trend
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Based on unfinished tasks, urgency, and recent Mind Unloads.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-sm text-cyan-300">{trend}</div>
            <div className="text-xs text-zinc-500">
              Current: {latest.load}/100
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
          {insight}
        </div>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="mentalLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#7DD3FC" stopOpacity={0} />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="load"
                stroke="#7DD3FC"
                fill="url(#mentalLoad)"
                strokeWidth={3}
                dot={{ r: 3, fill: "#7DD3FC" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
          <Legend label="Manageable" value="0-44" />
          <Legend label="Moderate" value="45-74" />
          <Legend label="Heavy" value="75+" danger />
        </div>
      </div>
    </section>
  );
}

function Legend({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
      <div className={danger ? "text-red-300" : "text-zinc-300"}>{label}</div>
      <div className="mt-1 text-zinc-500">{value}</div>
    </div>
  );
}